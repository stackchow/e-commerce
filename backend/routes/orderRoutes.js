const orderController = require("../controller/order");
const express = require("express");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");

const orderRouter = express.Router();

orderRouter.get("/get-all-orders/:userId", orderController.getAllUserOrders);
orderRouter.get(
  "/get-seller-all-orders/:shopId",
  orderController.getSellerAllOrders
);
orderRouter.get(
  "/admin-all-orders",
  isAuthenticated,
  isAdmin("Admin"),
  orderController.adminGetAllOrders
);
orderRouter.post("/create-order", orderController.createNewOrder);
orderRouter.put(
  "/update-order-status/:id",
  isSeller,
  orderController.updateOrderStatus
);
orderRouter.put("/order-refund/:id", orderController.orderRefund);
orderRouter.put(
  "/order-refund-success/:id",
  isSeller,
  orderController.acceptOrderRefund
);

module.exports = orderRouter;
