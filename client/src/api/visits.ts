import type { CreateVisitInput, Visit } from "@clinica/shared";
import { apiGet, apiPost } from "./client";

export const getVisits = (): Promise<Visit[]> => apiGet("/visits");

export const createVisit = (visit: CreateVisitInput): Promise<Visit> =>
  apiPost("/visits", visit);
