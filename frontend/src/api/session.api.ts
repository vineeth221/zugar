import { http } from "./http";

export const getSessions = async () => {
  const res = await http.get("/sessions");
  return res.data.sessions || [];
};

export const createSession = async () => {
  const res = await http.post("/sessions", {
    title: "New ARKHA Session",
  });

  return res.data.session;
};

export const getSessionMessages = async (sessionId: string) => {
  const res = await http.get(`/sessions/${sessionId}/messages`);
  return res.data.messages || [];
};