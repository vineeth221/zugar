export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  _id?: string;
  role: ChatRole;
  content: string;
}

export interface Session {
  _id: string;
  title: string;
  lastMessage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Insight {
  _id: string;
  label: string;
  value: string;
  note: string;
  type?: string;
}

export interface ChatRequest {
  message: string;
  history: ChatMessage[];
  sessionId?: string | null;
}

export interface ChatResponse {
  success: boolean;
  sessionId?: string;
  reply: string;
  projects?: any[];
}