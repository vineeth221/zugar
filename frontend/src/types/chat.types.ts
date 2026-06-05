import { Project } from "./project.types";

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

export interface Preference {
  _id?: string;
  sessionId?: string;
  budgetMin?: number;
  budgetMax?: number;
  purpose: "end_use" | "investment" | "both";
  propertyTypes: string[];
  locations: string[];
  priorities: string[];
  workLocation?: string;
  familySize?: string;
  possessionPreference?: string;
  schoolsRequired?: boolean;
}

export interface Recommendation {
  _id: string;
  projectId: Project;
  confidenceScore: number;
  financialFit: number;
  commuteFit: number;
  lifestyleFit: number;
  appreciationFit: number;
  riskLevel: "Low" | "Medium" | "High";
  reasons: string[];
  tradeoffs: string[];
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
  projects?: Project[];
  preference?: Preference | null;
}