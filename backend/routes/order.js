import express from "express";
const router = express.Router();

import { authorizeRoles, isAuthenticatedUser } from "../Middlewares/authChecker.js"
import {
  allOrders,
  deleteOrder,
  getOrderDetails,
  getSales,
  myOrders,
  newOrder,
  updateOrder,
} from "../controllers/orderController.js"

router.route("/orders/new").post(isAuthenticatedUser, newOrder);
router.route("/orders/:id").get(isAuthenticatedUser, getOrderDetails);
router.route("/me/orders").get(isAuthenticatedUser, myOrders);

router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("Admin"), allOrders);


  router
  .route("/admin/get_sales")
  .get(isAuthenticatedUser, authorizeRoles("Admin"), getSales);


router
  .route("/admin/orders/:id")
  .put(isAuthenticatedUser, authorizeRoles("Admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("Admin"), deleteOrder);

export default router;