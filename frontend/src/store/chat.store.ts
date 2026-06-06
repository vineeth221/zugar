import { create } from "zustand";

import {
  ChatMessage,
  Insight,
  Preference,
  Recommendation,
  Session,
} from "@/types/chat.types";

import { Project } from "@/types/project.types";

import { sendChatMessage } from "@/api/chat.api";
import { getProjects } from "@/api/project.api";
import {
  createSession,
  getSessionMessages,
  getSessions,
} from "@/api/session.api";
import { getInsights } from "@/api/insight.api";
import { createLead } from "@/api/lead.api";
import { savePreference } from "@/api/preference.api";
import { generateRecommendations } from "@/api/recommendation.api";
import { compareProjects } from "@/api/comparison.api";

interface ChatStore {
  messages: ChatMessage[];
  sessions: Session[];
  projects: Project[];
  insights: Insight[];
  recommendations: Recommendation[];
  comparison: any[];
  preference: Preference | null;
  activeSessionId: string | null;
  isLoading: boolean;
  isGenerating: boolean;
  error: string | null;

  loadInitialData: () => Promise<void>;
  createNewSession: () => Promise<void>;
  openSession: (sessionId: string) => Promise<void>;
  submitPreference: (preference: Preference) => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
  talkToBuilder: (project: Project) => Promise<void>;
  runComparison: (projectIds: string[]) => Promise<void>;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  sessions: [],
  projects: [],
  insights: [],
  recommendations: [],
  comparison: [],
  preference: null,
  activeSessionId: null,
  isLoading: false,
  isGenerating: false,
  error: null,

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
        error: null,
      });
    } catch (error) {
      console.error("Initial load error:", error);
      set({ error: "Failed to load initial data" });
    }
  },

  createNewSession: async () => {
    try {
      const session = await createSession();

      set({
        activeSessionId: session._id,
        messages: [],
        preference: null,
        recommendations: [],
        comparison: [],
      });

      await get().loadInitialData();
    } catch (error) {
      console.error("Create session error:", error);
      set({ error: "Failed to create session" });
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
      set({
        isLoading: false,
        error: "Failed to open session",
      });
    }
  },

  submitPreference: async (preference) => {
  try {
    set({
      isGenerating: true,
      preference,
      recommendations: [],
      comparison: [],
      error: null,
    });

    let sessionId = get().activeSessionId;

    if (!sessionId) {
      const session = await createSession();
      sessionId = session._id;
    }

    const saved = await savePreference(sessionId, preference);

    const recommendations = await generateRecommendations(saved.sessionId);

    set({
      activeSessionId: saved.sessionId,
      preference: saved.preference,
      recommendations,
      comparison: [],
      isGenerating: false,
    });

    await get().loadInitialData();
  } catch (error) {
    console.error("Preference error:", error);

    set({
      isGenerating: false,
      recommendations: [],
      comparison: [],
      error: "No matching projects found. Try changing location, budget, or property type.",
    });
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
        preference: data.preference || get().preference,
        isLoading: false,
      });

      await get().loadInitialData();
    } catch (error) {
      console.error("Chat error:", error);

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "ARKHA could not process this right now. Please try again in a moment.",
      };

      set({
        messages: [...currentMessages, userMessage, assistantMessage],
        isLoading: false,
      });
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
      set({ error: "Failed to create builder lead" });
    }
  },

  runComparison: async (projectIds) => {
    const sessionId = get().activeSessionId;

    if (!sessionId) {
      set({ error: "Create a session first" });
      return;
    }

    try {
      const comparison = await compareProjects(sessionId, projectIds);
      set({ comparison });
    } catch (error) {
      console.error("Comparison error:", error);
      set({ error: "Failed to compare projects" });
    }
  },
}));