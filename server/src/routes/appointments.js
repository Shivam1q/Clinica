import { Router } from "express";
import validateAppointment from "../middleware/validateAppointment.js";
import {
  getAppointments,
  createAppointment,
} from "../controllers/appointmentsController.ts";

const router = Router();

router.get("/", getAppointments);
router.post("/", validateAppointment, createAppointment);

export default router;
