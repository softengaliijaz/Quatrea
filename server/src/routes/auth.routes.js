import { Router } from "express";
import rateLimit from "express-rate-limit";
import {
  register,
  login,
  refresh,
  logout,
  me,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.js";
import validate from "../middleware/validate.js";
import {
  registerRules,
  loginRules,
  emailRules,
  resetPasswordRules,
} from "../validators/index.js";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many attempts, try again later" },
});
const resetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many attempts, try again later" },
});
const router = Router();

router.post("/register", limiter, registerRules, validate, register);
router.post("/login", limiter, loginRules, validate, login);
router.post("/forgot-password", resetLimiter, emailRules, validate, forgotPassword);
router.post(
  "/reset-password",
  resetLimiter,
  resetPasswordRules,
  validate,
  resetPassword,
);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/me", protect, me);
export default router;
