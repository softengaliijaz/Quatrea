import { Router } from "express";
import {
  subscribe,
  unsubscribe,
  listSubscribers,
} from "../controllers/contact.controller.js";
import { protect, authorize } from "../middleware/auth.js";
import validate from "../middleware/validate.js";
import { emailRules } from "../validators/index.js";

const router = Router();
router.post("/subscribe", emailRules, validate, subscribe);
router.post("/unsubscribe", emailRules, validate, unsubscribe);
router.get("/", protect, authorize("admin"), listSubscribers);
export default router;
