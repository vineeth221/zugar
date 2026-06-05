import { http } from "./http";
import { Preference } from "@/types/chat.types";

export const savePreference = async (
  sessionId: string | null,
  preference: Preference
) => {
  const res = await http.post("/preferences", {
    sessionId,
    preference,
  });

  return res.data;
};

export const getPreference = async (sessionId: string) => {
  const res = await http.get(`/preferences/${sessionId}`);
  return res.data.preference;
};