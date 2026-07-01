import axios from "axios";
import type { Patient } from "../types";

const baseUrl = "http://localhost:3001/patients";

export const getAllPatients = async (): Promise<Patient[]> => {
  const response = await axios.get<Patient[]>(baseUrl);
  return response.data;
};

export const createPatient = async (
  patient: Omit<Patient, "id">,
): Promise<Patient> => {
  const response = await axios.post<Patient>(baseUrl, patient);
  return response.data;
};
