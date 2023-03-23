const mongoose = require("mongoose");
require("dotenv").config();

async function DB() {
  try {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(console.log("Connected successfully"));
  } catch (error) {
    console.log(error.message, "error connecting to database");
  }
}
module.exports = DB;
