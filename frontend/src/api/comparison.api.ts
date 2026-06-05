import { http } from "./http";

export const compareProjects = async (
  sessionId: string,
  projectIds: string[]
) => {
  const res = await http.post("/comparisons", {
    sessionId,
    projectIds,
  });

  return res.data.comparison || [];
};