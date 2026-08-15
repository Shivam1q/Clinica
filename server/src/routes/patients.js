import { Router } from "express";
import validatePatient from "../middleware/validatePatient.js";
import {
  getAllPatients,
  getPatient,
  createPatient,
} from "../controllers/patientsController.ts";

const router = Router();

router.get("/", getAllPatients);
router.post("/", validatePatient, createPatient);
router.get("/:id", getPatient);

export default router;
