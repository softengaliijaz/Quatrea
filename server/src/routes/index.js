import { Router } from "express";
import auth from "./auth.routes.js";
import users from "./user.routes.js";
import perfumes from "./perfume.routes.js";
import reviews from "./review.routes.js";
import cart from "./cart.routes.js";
import orders from "./order.routes.js";
import contact from "./contact.routes.js";
import newsletter from "./newsletter.routes.js";
import admin from "./admin.routes.js";

const router = Router();
router.get("/health", (req, res) =>
  res.json({ success: true, service: "quatrea-api" }),
);
router.use("/auth", auth);
router.use("/users", users);
router.use("/perfumes", perfumes);
router.use("/reviews", reviews);
router.use("/cart", cart);
router.use("/orders", orders);
router.use("/contact", contact);
router.use("/newsletter", newsletter);
router.use("/admin", admin);
export default router;
