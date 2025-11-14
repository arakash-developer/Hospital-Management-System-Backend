const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Simplified and minimal user controller

const createUser = async (req, res) => {
  try {
    const { email, username, password, role } = req.body || {};
    if (!email || !username || !password) {
      return res
        .status(400)
        .json({ error: "email, username and password are required" });
    }

    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing)
      return res
        .status(409)
        .json({ error: "Email or username already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashed,
      role: role || "user",
    });
    const userObj = user.toObject();
    delete userObj.password;
    return res.status(201).json(userObj);
  } catch (err) {
    console.error("createUser error:", err);
    return res
      .status(500)
      .json({ error: err.message || "Internal server error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").lean();
    return res.json(users);
  } catch (err) {
    console.error("getUsers error:", err);
    return res
      .status(500)
      .json({ error: err.message || "Internal server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params || {};
    const user = await User.findById(id).select("-password").lean();
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
  } catch (err) {
    console.error("getUserById error:", err);
    return res
      .status(500)
      .json({ error: err.message || "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params || {};
    const { email, username, password, role } = req.body || {};

    const updateData = {};
    if (email !== undefined) updateData.email = email;
    if (username !== undefined) updateData.username = username;
    if (role !== undefined) updateData.role = role;
    if (password) updateData.password = await bcrypt.hash(password, 10);

    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .select("-password")
      .lean();
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
  } catch (err) {
    console.error("updateUser error:", err);
    return res
      .status(500)
      .json({ error: err.message || "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params || {};
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    const userObj = user.toObject();
    delete userObj.password;
    return res.json({ message: "User deleted successfully", user: userObj });
  } catch (err) {
    console.error("deleteUser error:", err);
    return res
      .status(500)
      .json({ error: err.message || "Internal server error" });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
