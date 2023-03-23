const mongoose = require("mongoose");

const { model, Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      minLength: 5,
      maxLength: 16,
      trim: true,
    },
    dob: {
      type: Date,
      // min: 19,
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: 5,
      maxLength: 16,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
module.exports = User;
