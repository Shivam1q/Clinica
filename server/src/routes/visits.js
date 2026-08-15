import { Router } from "express";
import { validateBody } from "../middleware/validate.ts";
import { createVisitSchema } from "../schemas/visit.ts";
import { getVisits, createVisit } from "../controllers/visitsController.ts";

const router = Router();

router.get("/", getVisits);
router.post("/", validateBody(createVisitSchema), createVisit);

export default router;
