import { Router } from "express";
import { validateBody } from "../middleware/validate.ts";
import { createAppointmentSchema } from "../schemas/appointment.ts";
import {
  getAppointments,
  createAppointment,
} from "../controllers/appointmentsController.ts";

const router = Router();

router.get("/", getAppointments);
router.post("/", validateBody(createAppointmentSchema), createAppointment);

export default router;
