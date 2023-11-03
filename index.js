const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const mongoose = require("mongoose");
const userDataRoutes = require("./routes/userDataRoutes");
const jobRouter = require("./routes/jobRoutes");
const port = process.env.PORT || 3000;
app.use(express.json());

app.use("/users", userRouter);
app.use("/userData", userDataRoutes);
app.use("/jobs", jobRouter);

mongoose
  .connect(
    "mongodb+srv://patelshivam21194:Patel%408140297844@husle4work.onxfqqr.mongodb.net/"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`server stared on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
