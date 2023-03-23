const express = require("express");
const Joi = require("joi");
const User = require("../models/user");
const moment = require("moment");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await User.find();
    if (!data) {
      return res.status(400).json({ error: "Try again later" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error, "Make sure you have an active network connection");
  }
});
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await User.findOne({ _id: id });
    if (!data) {
      return res.status(400).json({ error: "Try again later" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error, "Make sure you have an active network connection");
  }
});
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { username, dob, email, password } = req.body;
  const record = {
    username,
    dob,
    email,
    password,
  };
  try {
    const data = await User.findByIdAndUpdate(id, record, { new: true });
    if (!data) {
      return res.status(400).json({ error: "Try again later" });
    }
    res.status(200).json("Record updated successfully");
  } catch (error) {
    console.log(error, "Make sure you have an active network connection");
  }
});
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const data = await User.findByIdAndRemove(id, { new: true });
    if (!data) {
      return res.status(400).json({ error: "Try again later" });
    }
    res.status(200).json("Record removed successfully");
  } catch (error) {
    console.log(error, "Make sure you have an active network connection");
  }
});

router.post("/", async (req, res) => {
  const { username, dob, email, password } = req.body;
  if (!username || !dob || !email || !password) {
    return res.status(400).json({ error: "Pls fill out all the fields" });
  }

  const schema = Joi.object().keys({
    username: Joi.string().min(5).max(16).required(),
    email: Joi.string().email({
      minDomainSegments: 1,
      tlds: { allow: ["com"] },
    }),
  });

  const { error } = schema.validate({ username, email });
  if (error) {
    console.log(error.details[0].message);
    return res.status(400).json({ error: error.details[0].message });
  }

  console.log(dob);

  const year = new Date().getFullYear() - new Date(dob).getFullYear();

  const month = new Date().getMonth() - new Date(dob).getMonth();
  const day = new Date().getDate() - new Date(dob).getDate();

  if (year < 18) {
    return res.status(400).json({ error: "Invalid DOB" });
  } else if (year == 18 && month < 0) {
    return res.status(400).json({ error: "Invalid DOB" });
  } else if (month == 0 && day < 0) {
    return res.status(400).json({ error: "Invalid DOB" });
  }

  if (
    !password.match(
      /^(?=.*[a-z])(?=[^A-Z]*[A-Z][^A-Z]*$)(?=[^0-9]*[0-9]{2}[^0-9]*$)[a-zA-Z0-9]{5,16}$/
    )
  ) {
    return res.status(400).json({ error: "Invalid password" });
  }
  try {
    const checkUserWithEmail = await User.findOne({ email });
    const checkUserWithUsername = await User.findOne({ username });
    if (checkUserWithEmail) {
      return res.status(400).json({ error: "User already registered" });
    } else if (checkUserWithUsername) {
      return res
        .status(400)
        .json({ error: "User with the username already exists" });
    }
    const user = new User({
      username,
      dob,
      age: year,
      email,
      password,
    });
    const record = await user.save();
    return res.status(200).json({ message: true, record });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
