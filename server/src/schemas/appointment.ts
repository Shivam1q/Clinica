import { z } from "zod";

export const createAppointmentSchema = z.object({
  patientId: z
    .string({ required_error: "patientId is required" })
    .trim()
    .min(1, "patientId is required"),
  time: z.string().optional(),
  reason: z.string().optional(),
  patientName: z.string().optional(),
});

export const updateAppointmentSchema = createAppointmentSchema.partial();

export type CreateAppointmentBody = z.infer<typeof createAppointmentSchema>;
export type UpdateAppointmentBody = z.infer<typeof updateAppointmentSchema>;
