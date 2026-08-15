import { Router } from "express";
import { validateBody } from "../middleware/validate.ts";
import { createPatientSchema } from "../schemas/patient.ts";
import {
  getAllPatients,
  getPatient,
  createPatient,
} from "../controllers/patientsController.ts";

const router = Router();

router.get("/", getAllPatients);
router.post("/", validateBody(createPatientSchema), createPatient);
router.get("/:id", getPatient);

export default router;
