const express = require("express");
const { signin, signup, resetPass, setNewPass, jobApply } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("hello from user router");
});

userRouter.post("/signin", signin);

userRouter.post("/signup", signup);

userRouter.post("/forgetpassword", resetPass);

userRouter.post("/resetPassword", setNewPass);

userRouter.post("/JobApply", jobApply)

module.exports = userRouter;
