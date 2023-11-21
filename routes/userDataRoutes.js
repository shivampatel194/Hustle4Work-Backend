 const express = require("express");
const { getAllUserData, createUserData, deleteUserData, updateUserData } = require("../controllers/userDetailsController");
const auth = require("../middlewares/auth");
 const userDataRoutes = express.Router();

 userDataRoutes.get("/" ,auth, getAllUserData);

 userDataRoutes.post("/createUserData", auth, createUserData);

 userDataRoutes.delete("/:id", auth,deleteUserData);

 userDataRoutes.put("/:id", auth, updateUserData);

 module.exports = userDataRoutes;