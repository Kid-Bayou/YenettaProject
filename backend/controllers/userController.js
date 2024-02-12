const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");

const register = async (req, res) => {
  const {name, email, password} = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ error: "Please add all fields" });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ error: "User already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400).json({ error: "User not created" });
  }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email});
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(400).json({ error: "Invalid credential"});
    }
};

const getProfile = (req, res) => {
  res.json({ message: "user Profile" });
};

module.exports = { register, login, getProfile };
