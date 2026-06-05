import { http } from "./http";

export const createLead = async (payload: unknown) => {
  const res = await http.post("/leads", payload);
  return res.data;
};