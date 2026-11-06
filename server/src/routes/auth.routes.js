import { Router } from "express";
import rateLimit from "express-rate-limit";
import {
  register,
  login,
  refresh,
  logout,
  me,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.js";
import validate from "../middleware/validate.js";
import { registerRules, loginRules } from "../validators/index.js";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many attempts, try again later" },
});
const router = Router();

router.post("/register", limiter, registerRules, validate, register);
router.post("/login", limiter, loginRules, validate, login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/me", protect, me);
export default router;
