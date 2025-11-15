const bcrypt = require("bcrypt");
const user = require("../models/user");
const saltRounds = 10;

const createUser = async (req, res) => {
  try {
    const body = req.body || {};
    if (Object.keys(body).length === 0) {
      return res.status(400).json({ message: "Request body is required" });
    }

    const { name, email, username, password, role } = body;

    if (!name || !email || !username || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email exists
    const emailExists = await user.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // Check if username exists
    const usernameExists = await user.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password (promise-based) and save the user
    const hash = await bcrypt.hash(password, saltRounds);
    const newUser = new user({ name, email, username, password: hash, role });
    await newUser.save();

    return res
      .status(201)
      .json({ message: "User created successfully", userId: newUser._id });
  } catch (err) {
    console.error("createUser error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

const getUser = (req, res) => {
  res.send("User details");
};
const updateUser = (req, res) => {
  res.send("User updated successfully");
};
const deleteUser = (req, res) => {
  res.send("User deleted successfully");
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
