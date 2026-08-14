import { Router } from "express";
import validatePatient from "../middleware/validatePatient.js";
import {
  getAllPatients,
  getPatient,
  createPatient,
} from "../controllers/patientsController.js";

const router = Router();

router.get("/", getAllPatients);
router.post("/", validatePatient, createPatient);
router.get("/:id", getPatient);

export default router;
