import { z } from "zod";

const optionalAge = z.preprocess((value) => {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? value : parsed;
  }
  return value;
}, z.number().int().positive("Age must be a positive whole number").optional());

export const createPatientSchema = z.object({
  name: z.string({ required_error: "Name is required" }).trim().min(1, "Name is required"),
  phone: z
    .string({ required_error: "Phone is required" })
    .transform((value) => value.replace(/\D/g, ""))
    .refine((digits) => digits.length >= 10, {
      message: "Phone must have at least 10 digits",
    }),
  age: optionalAge,
  lastVisit: z.string().nullable().optional(),
});

export const updatePatientSchema = createPatientSchema.partial();

export type CreatePatientBody = z.infer<typeof createPatientSchema>;
export type UpdatePatientBody = z.infer<typeof updatePatientSchema>;
