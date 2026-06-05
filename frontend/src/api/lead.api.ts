import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const createLead = async (payload: any) => {
  const res = await axios.post(`${API_BASE_URL}/leads`, payload);
  return res.data;
};