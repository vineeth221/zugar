import { http } from "./http";

export const getInsights = async () => {
  const res = await http.get("/insights");
  return res.data.insights || [];
};