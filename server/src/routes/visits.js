import { Router } from "express";
import validateVisit from "../middleware/validateVisit.js";
import { getVisits, createVisit } from "../controllers/visitsController.ts";

const router = Router();

router.get("/", getVisits);
router.post("/", validateVisit, createVisit);

export default router;
