const express = require("express");
const auth = require("../middlewares/auth");
const { getAllJob, createJob } = require("../controllers/jobController");

const jobRouter = express.Router();

jobRouter.get("/" , getAllJob);

jobRouter.post("/createJob", auth, createJob);

module.exports = jobRouter;


