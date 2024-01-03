const messageController = require("../controller/message");
const express = require("express");
const messageRouter = express.Router();

messageRouter.get("/get-all-messages/:id",messageController.getAllMessagesById);
messageRouter.post("/create-new-message", messageController.createNewMessage);

module.exports = messageRouter;
