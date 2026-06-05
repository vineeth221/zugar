import axios from "axios";
import { ChatRequest, ChatResponse } from "@/types/chat.types";

const API_BASE_URL = "http://localhost:5000/api";

export const sendChatMessage = async (
  payload: ChatRequest
): Promise<ChatResponse> => {
  const response = await axios.post(`${API_BASE_URL}/chat`, payload);
  return response.data;
};