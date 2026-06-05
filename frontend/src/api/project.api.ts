import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const getProjects = async () => {
  const res = await axios.get(`${API_BASE_URL}/projects`);
  return res.data.projects;
};