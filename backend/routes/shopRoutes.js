const shopController = require("../controller/shop");
const express = require("express");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");
const shopRouter = express.Router();

shopRouter.get("/getSeller", isSeller, shopController.getSeller);
shopRouter.get("/get-shop-info/:id", isSeller, shopController.getShopInfo);
shopRouter.get("/logout", shopController.shopLogout);
shopRouter.get(
  "/admin-all-sellers",
  isAuthenticated,
  isAdmin("Admin"),
  shopController.adminGetAllSellers
);
shopRouter.post("/create-shop", shopController.createShop);
shopRouter.post("/activation", shopController.activateUser);
shopRouter.post("/login-shop", shopController.shopLogin);
shopRouter.put(
  "/update-shop-avatar",
  isSeller,
  shopController.updateShopAvatar
);
shopRouter.put(
  "/update-seller-info",
  isSeller,
  shopController.updateSellerInfo
);
shopRouter.put(
  "/update-payment-methods",
  isSeller,
  shopController.updatePaymentMethods
);
shopRouter.delete(
  "/delete-seller/:id",
  isAuthenticated,
  isAdmin("Admin"),
  shopController.deleteSellerById
);
shopRouter.delete(
  "/delete-withdraw-method/",
  isSeller,
  shopController.deleteWithdrawMethod
);

module.exports = shopRouter;