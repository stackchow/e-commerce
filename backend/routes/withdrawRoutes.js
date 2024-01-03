const express = require("express");
const withdrawController = require("../controller/withdraw");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");

const withdrawRouter = express.Router();

withdrawRouter.post(
  "/create-withdraw-request",
  isSeller,
  withdrawController.createWithdrawReq
);
withdrawRouter.get(
  "/get-all-withdraw-request",
  isAuthenticated,
  isAdmin("Admin"),
  withdrawController.adminGetAllWithdraws
);
withdrawRouter.put(
  "/update-withdraw-request/:id",
  isAuthenticated,
  isAdmin("Admin"),
  withdrawController.adminUpdateWithdrawReq
);

module.exports = withdrawRouter;