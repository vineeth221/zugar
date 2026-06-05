import { http } from "./http";
import { ChatRequest, ChatResponse } from "@/types/chat.types";

export const sendChatMessage = async (
  payload: ChatRequest
): Promise<ChatResponse> => {
  const response = await http.post("/chat", payload);
  return response.data;
};