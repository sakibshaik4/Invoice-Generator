const express = require("express");
const { UserController } = require("../controller");
const { checkSession } = require("../util/checkSession");

const userRouter = express.Router();

userRouter.get("/get-user", checkSession, UserController.getUser);
userRouter.post("/signup", UserController.addUser);
userRouter.put("/update-user", checkSession, UserController.updateUser);
userRouter.delete("/delete-user", checkSession, UserController.deleteUser);
userRouter.post("/login", UserController.login);
userRouter.post("/logout", checkSession, UserController.logout);
userRouter.post(
  "/validate-session",
  checkSession,
  UserController.validateSession
);
userRouter.post(
  "/dashboard-stats",
  checkSession,
  UserController.getDashboardStats
);

module.exports = userRouter;
