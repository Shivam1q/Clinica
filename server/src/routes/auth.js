import { Router } from "express";
import validateRegister from "../middleware/validateRegister.js";
import validateLogin from "../middleware/validateLogin.js";
import requireAuth from "../middleware/requireAuth.js";
import { register, login, logout, me } from "../controllers/authController.ts";

const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/logout", logout);
router.get("/me", requireAuth, me);

export default router;
