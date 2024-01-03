const express = require("express");
const convoController = require("../controller/conversation");
const { isSeller, isAuthenticated } = require("../middleware/auth");

const convoRouter = express.Router();

convoRouter.get(
  "/get-all-conversation-seller/:id",
  isSeller,
  convoController.getAllConvoSellerById
);
convoRouter.get(
  "/get-all-conversation-user/:id",
  isAuthenticated,
  convoController.getAllConvoUserById
);
convoRouter.post("/create-new-conversation", convoController.createNewConvo);
convoRouter.put(
  "/update-last-message/:id",
  convoController.getAllConvoUserById
);

module.exports = convoRouter;
