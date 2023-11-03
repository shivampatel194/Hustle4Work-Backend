const express = require("express");
const { signin, signup } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("hello from user router");
});
userRouter.post("/signin", signin);

userRouter.post("/signup", signup);

module.exports = userRouter;
