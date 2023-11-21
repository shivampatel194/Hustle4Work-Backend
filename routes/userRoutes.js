const express = require("express");
const { signin, signup, resetPass, setNewPass, jobApply, getUserJob } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("hello from user router sdfd");
});
userRouter.post("/signin", signin);

userRouter.post("/signup", signup);

userRouter.post("/forgetpassword", resetPass);

userRouter.post("/resetPassword", setNewPass);

userRouter.post("/JobApply", jobApply);

userRouter.get("/getUserJob", getUserJob)

module.exports = userRouter;
