import type { Appointment, CreateAppointmentInput } from "@clinica/shared";
import { apiGet, apiPost } from "./client";

export const getAppointments = (): Promise<Appointment[]> =>
  apiGet("/appointments");

export const createAppointment = (
  appointment: CreateAppointmentInput,
): Promise<Appointment> => apiPost("/appointments", appointment);
