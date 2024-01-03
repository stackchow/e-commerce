const couponsController = require("../controller/couponCode");
const express = require("express");
const { isSeller } = require("../middleware/auth");
const couponsRouter = express.Router();

couponsRouter.get(
  "/get-coupon/:id",
  isSeller,
  couponsController.getShopCoupons
);

couponsRouter.get("/get-coupon-value/:name", couponsController.getCouponByName);

couponsRouter.post(
  "/create-coupon-code",
  isSeller,
  couponsController.createNewCoupon
);
couponsRouter.delete(
  "/delete-coupon/:id",
  isSeller,
  couponsController.deleteCouponById
);

module.exports = couponsRouter;
