const bcrypt = require("bcryptjs");
const User = require("../models/User");

const isProd =
  process.env.RUNNING === "production" || process.env.NODE_ENV === "production";

// Create User
const createUser = async (req, res) => {
  try {
    // guard against undefined body to avoid destructuring error
    if (req.body === undefined) {
      console.error(
        "Create user error: req.body is undefined. Ensure express.json() middleware is enabled."
      );
      return res.status(400).json({
        error:
          "Request body missing. Enable body parsing middleware (e.g. app.use(express.json())).",
      });
    }

    const { email, username, password, role } = req.body;

    if (!email || !username || !password || !role) {
      return res
        .status(400)
        .json({ error: "email, username, password and role are required" });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ error: "Email or username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      username,
      password: hashedPassword,
      role,
    });

    await user.save();
    const userObj = user.toObject();
    delete userObj.password;
    res.status(201).json(userObj);
  } catch (error) {
    console.error("Create user error:", error);
    const payload = { error: isProd ? "Failed to create user" : error.message };
    if (!isProd) payload.stack = error.stack;
    res.status(500).json(payload);
  }
};

// Get All Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").lean();
    res.json(users);
  } catch (error) {
    console.error("Get users error:", error);
    const payload = { error: isProd ? "Failed to fetch users" : error.message };
    if (!isProd) payload.stack = error.stack;
    res.status(500).json(payload);
  }
};

// Get Single User by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password").lean();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Get user by ID error:", error);
    const payload = { error: isProd ? "Failed to fetch user" : error.message };
    if (!isProd) payload.stack = error.stack;
    // keep 400 for invalid id patterns where applicable
    res.status(400).json(payload);
  }
};

// Update User
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    // guard against undefined body to avoid destructuring error
    if (req.body === undefined) {
      console.error(
        "Update user error: req.body is undefined. Ensure express.json() middleware is enabled."
      );
      return res.status(400).json({
        error:
          "Request body missing. Enable body parsing middleware (e.g. app.use(express.json())).",
      });
    }

    const { email, username, password, role } = req.body;

    const updateData = {
      ...(email !== undefined && { email }),
      ...(username !== undefined && { username }),
      ...(role !== undefined && { role }),
    };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    console.error("Update user error:", error);
    const payload = { error: isProd ? "Failed to update user" : error.message };
    if (!isProd) payload.stack = error.stack;
    res.status(400).json(payload);
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ message: "User deleted successfully", user });
  } catch (error) {
    console.error("Delete user error:", error);
    const payload = { error: isProd ? "Failed to delete user" : error.message };
    if (!isProd) payload.stack = error.stack;
    res.status(400).json(payload);
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
