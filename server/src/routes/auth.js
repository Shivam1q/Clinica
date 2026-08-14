import { Router } from "express";
import validateRegister from "../middleware/validateRegister.js";
import validateLogin from "../middleware/validateLogin.js";
import requireAuth from "../middleware/requireAuth.js";
import { register, login, me } from "../controllers/authController.js";

const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/me", requireAuth, me);

export default router;
