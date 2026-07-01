import axios from "axios";
import type { Visit } from "../types";

const baseUrl = "http://localhost:3001/visits";

export const createVisit = async (visit: Omit<Visit, "id">): Promise<Visit> => {
  const response = await axios.post<Visit>(baseUrl, visit);
  return response.data;
};
