import type { CreatePatientInput, Patient } from "@clinica/shared";
import { apiGet, apiPost } from "./client";

export const getPatients = (): Promise<Patient[]> => apiGet("/patients");

export const getPatient = (id: string): Promise<Patient> =>
  apiGet(`/patients/${id}`);

export const createPatient = (patient: CreatePatientInput): Promise<Patient> =>
  apiPost("/patients", patient);
