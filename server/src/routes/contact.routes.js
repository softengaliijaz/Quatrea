import { Router } from "express";
import {
  sendMessage,
  listMessages,
  markRead,
  deleteMessage,
} from "../controllers/contact.controller.js";
import { protect, authorize } from "../middleware/auth.js";
import validate from "../middleware/validate.js";
import { contactRules, idParam } from "../validators/index.js";

const router = Router();
router.post("/", contactRules, validate, sendMessage);
router.get("/", protect, authorize("admin"), listMessages);
router.patch(
  "/:id/read",
  protect,
  authorize("admin"),
  idParam(),
  validate,
  markRead,
);
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  idParam(),
  validate,
  deleteMessage,
);
export default router;
