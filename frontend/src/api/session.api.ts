import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const getSessions = async () => {
  const res = await axios.get(`${API_BASE_URL}/sessions`);
  return res.data.sessions;
};

export const createSession = async () => {
  const res = await axios.post(`${API_BASE_URL}/sessions`, {
    title: "New ARKHA Session",
  });

  return res.data.session;
};

export const getSessionMessages = async (sessionId: string) => {
  const res = await axios.get(
    `${API_BASE_URL}/sessions/${sessionId}/messages`
  );

  return res.data.messages;
};