import { http } from "./http";

export const generateRecommendations = async (sessionId: string) => {
  const res = await http.post("/recommendations/generate", {
    sessionId,
  });

  return res.data.recommendations || [];
};

export const getRecommendations = async (sessionId: string) => {
  const res = await http.get(`/recommendations/${sessionId}`);
  return res.data.recommendations || [];
};