const express = require("express");
const productController = require("../controller/product");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");

const productRouter = express.Router();

productRouter.get("/get-all-products", productController.getAllProducts);
productRouter.get(
  "/get-all-products-shop/:id",
  productController.getAllProductsByShop
);
productRouter.get(
  "/admin-all-products",
  isAuthenticated,
  isAdmin("Admin"),
  productController.adminGetAllProducts
);
productRouter.post("/create-product", productController.createProduct);
productRouter.put(
  "/create-new-review",
  isAuthenticated,
  productController.createNewReview
);
productRouter.delete(
  "/delete-shop-product/:id",
  isSeller,
  productController.delShopProductById
);

module.exports = productRouter;