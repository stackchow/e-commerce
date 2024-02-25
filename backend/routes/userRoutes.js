const express = require("express");
const userController = require("../controller/user");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

const userRouter = express.Router();

userRouter.get("/getuser", isAuthenticated, userController.loadUser);
userRouter.get("/logout", isAuthenticated, userController.logoutUser);
userRouter.get("/user-info/:id", isAuthenticated, userController.getUserById);
userRouter.get("/user-chat-info/:id", userController.getUserById);
userRouter.get(
  "/admin-all-users",
  isAuthenticated,
  isAdmin("Admin"),
  userController.getAllAdminUsers
);
userRouter.post("/create-user", userController.createUser);
userRouter.post("/activation", userController.activateUser);
userRouter.post("/login-user", userController.loginUser);
userRouter.put(
  "/update-user-info",
  isAuthenticated,
  userController.updateUserInfo
);
userRouter.put("/update-avatar", isAuthenticated, userController.updateAvatar);
userRouter.put(
  "/update-user-addresses",
  isAuthenticated,
  userController.updateUserAddresses
);
userRouter.put(
  "/update-user-password",
  isAuthenticated,
  userController.updateUserPassword
);
userRouter.delete(
  "/delete-user-address/:id",
  isAuthenticated,
  userController.delUserAddress
);
userRouter.delete(
  "/delete-user/:id",
  isAuthenticated,
  userController.delAdminUserById
);

module.exports = userRouter;
