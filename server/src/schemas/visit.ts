import { z } from "zod";

export const createVisitSchema = z.object({
  patientId: z
    .string({ required_error: "patientId is required" })
    .trim()
    .min(1, "patientId is required"),
  summary: z.string().optional(),
  date: z.string().optional(),
});

export const updateVisitSchema = createVisitSchema.partial();

export type CreateVisitBody = z.infer<typeof createVisitSchema>;
export type UpdateVisitBody = z.infer<typeof updateVisitSchema>;
