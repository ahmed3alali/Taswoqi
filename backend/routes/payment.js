import express from "express";
const router = express.Router();


import {
  stripeCheckoutSession,
  stripeWebhook,
} from "../controllers/paymentController.js";
import { isAuthenticatedUser } from "../Middlewares/authChecker.js";

router
  .route("/payment/checkout_session")
  .post(isAuthenticatedUser, stripeCheckoutSession);

router.route("/payment/webhook").post(stripeWebhook);
export default router;