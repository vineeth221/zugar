import { http } from "./http";

export const getProjects = async () => {
  const res = await http.get("/projects");
  return res.data.projects || [];
};