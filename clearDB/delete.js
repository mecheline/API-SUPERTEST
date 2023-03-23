const DB = require("../database/db");
const User = require("../models/user");

async function clearCollection() {
  await DB();
  try {
    const deletedData = await User.deleteMany({ age: { $gt: 15 } });
    resizeBy.status(200).json("Deleted all users");
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = clearCollection;
