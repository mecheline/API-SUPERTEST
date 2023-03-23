const express = require("express");
const userRoute = require("./routes/users");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(
    app.listen(process.env.PORT, () => {
      console.log(`App running at port ${process.env.PORT}`);
    })
  )
  .catch((err) => {
    console.log("Error connecting to database");
  });

// const PORT = 5000;
app.use(cors());
app.use(express.json());

app.use("/home", (req, res) => {
  res.status(200).json("Automated test");
});

app.use("/users", userRoute);
