const express = require("express");
const eventController = require("../controller/event");
const { isSeller, isAdmin, isAuthenticated } = require("../middleware/auth");
const eventRouter = express.Router();

eventRouter.get("/get-all-events", eventController.getAllEvents);
eventRouter.get("/get-all-events/:id", eventController.getAllEventsOfShop);
eventRouter.get(
  "/admin-all-events",
  isAuthenticated,
  isAdmin("Admin"),
  eventController.adminAllEVents
);
eventRouter.post("/create-event", isSeller, eventController.createEvent); //added isSeller
eventRouter.delete("/delete-shop-event/:id", eventController.delEventOfShop);

module.exports = eventRouter;
