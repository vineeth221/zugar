import { create } from "zustand";

import {
  ChatMessage,
  Insight,
  Session,
} from "@/types/chat.types";

import { Project } from "@/types/project.types";

import { sendChatMessage } from "@/api/chat.api";
import { getProjects } from "@/api/project.api";
import { getSessions, getSessionMessages, createSession } from "@/api/session.api";
import { getInsights } from "@/api/insight.api";
import { createLead } from "@/api/lead.api";

interface ChatStore {
  messages: ChatMessage[];
  sessions: Session[];
  projects: Project[];
  insights: Insight[];
  activeSessionId: string | null;
  isLoading: boolean;
  
  createNewSession: () => Promise<void>;
  loadInitialData: () => Promise<void>;
  openSession: (sessionId: string) => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
  talkToBuilder: (project: Project) => Promise<void>;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  sessions: [],
  projects: [],
  insights: [],
  activeSessionId: null,
  isLoading: false,

  loadInitialData: async () => {
    try {
      const [sessions, projects, insights] = await Promise.all([
        getSessions(),
        getProjects(),
        getInsights(),
      ]);

      set({
        sessions,
        projects,
        insights,
      });
    } catch (error) {
      console.error("Initial load error:", error);
    }
  },

  createNewSession: async () => {
  try {
    const session = await createSession();

    set({
      activeSessionId: session._id,
      messages: [],
    });

    await get().loadInitialData();
  } catch (error) {
    console.error(error);
  }
},

  openSession: async (sessionId) => {
    try {
      set({ isLoading: true });

      const messages = await getSessionMessages(sessionId);

      set({
        activeSessionId: sessionId,
        messages: messages.map((m: any) => ({
          id: m._id,
          _id: m._id,
          role: m.role,
          content: m.content,
        })),
        isLoading: false,
      });
    } catch (error) {
      console.error("Open session error:", error);
      set({ isLoading: false });
    }
  },

  sendMessage: async (message) => {
    const currentMessages = get().messages;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: message,
    };

    set({
      messages: [...currentMessages, userMessage],
      isLoading: true,
    });

    try {
      const data = await sendChatMessage({
        message,
        history: currentMessages,
        sessionId: get().activeSessionId,
      });

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.reply,
      };

      set({
        activeSessionId: data.sessionId || get().activeSessionId,
        messages: [...currentMessages, userMessage, assistantMessage],
        projects: data.projects?.length ? data.projects : get().projects,
        isLoading: false,
      });

      get().loadInitialData();
    } catch (error) {
      console.error(error);
      set({ isLoading: false });
    }
  },

  talkToBuilder: async (project) => {
    try {
      await createLead({
        sessionId: get().activeSessionId,
        projectId: project._id,
        projectName: project.name,
        builder: project.builder,
        conversationSummary: get()
          .messages.map((m) => `${m.role}: ${m.content}`)
          .join("\n"),
      });

      const confirmation: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: `Done. I’ve created a builder enquiry for **${project.name}** by **${project.builder}**.`,
      };

      set({
        messages: [...get().messages, confirmation],
      });
    } catch (error) {
      console.error("Lead error:", error);
    }
  },
}));