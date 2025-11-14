const bcrypt = require("bcryptjs");
const User = require("../models/User");

const isProd =
  process.env.RUNNING === "production" || process.env.NODE_ENV === "production";

// Create User
const createUser = async (req = {}, res = {}) => {
  try {
    const contentType = (req.headers && req.headers["content-type"]) || "";
    const bodyEmpty =
      req.body === undefined ||
      (typeof req.body === "object" && Object.keys(req.body).length === 0);

    if (bodyEmpty) {
      console.error(
        "Create user error: req.body missing or empty. Ensure body-parsing middleware is enabled and client sends correct Content-Type."
      );
      return res.status ? res.status(400).json({
        error: "Request body missing or empty.",
        hint: contentType.includes("application/json")
          ? "If Content-Type is application/json, check that the JSON is well-formed (malformed JSON will produce an empty body). Also ensure app.use(express.json()) is enabled."
          : "Enable body parsing (app.use(express.json()) / app.use(express.urlencoded(...))) and set the appropriate Content-Type header.",
        contentType: contentType || "not provided",
      }) : undefined;
    }

    const { email, username, password, role } = req.body;

    // require email/username/password; role is optional
    if (!email || !username || !password) {
      return res.status(400).json({ error: "email, username and password are required" });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(409).json({ error: "Email or username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      username,
      password: hashedPassword,
      role: role || "user",
    });

    await user.save();
    const userObj = user.toObject();
    delete userObj.password;
    res.status(201).json(userObj);
  } catch (error) {
    console.error("Create user error:", error);
    const payload = { error: isProd ? "Failed to create user" : error.message };
    if (!isProd) payload.stack = error.stack;
    return res.status ? res.status(500).json(payload) : undefined;
  }
};

// Get All Users
const getUsers = async (req = {}, res = {}) => {
  try {
    const users = await User.find().select("-password").lean();
    return res.json(users);
  } catch (error) {
    console.error("Get users error:", error);
    const payload = { error: isProd ? "Failed to fetch users" : error.message };
    if (!isProd) payload.stack = error.stack;
    return res.status ? res.status(500).json(payload) : undefined;
  }
};

// Get Single User by ID
const getUserById = async (req = {}, res = {}) => {
  try {
    const { id } = req.params || {};
    const user = await User.findById(id).select("-password").lean();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    console.error("Get user by ID error:", error);
    const payload = { error: isProd ? "Failed to fetch user" : error.message };
    if (!isProd) payload.stack = error.stack;
    return res.status ? res.status(400).json(payload) : undefined;
  }
};

// Update User
const updateUser = async (req = {}, res = {}) => {
  try {
    const { id } = req.params || {};

    const contentType = req.headers && req.headers["content-type"];
    if (
      req.body === undefined ||
      (typeof req.body === "object" && Object.keys(req.body).length === 0)
    ) {
      console.error(
        "Update user error: req.body missing or empty. Ensure body-parsing middleware is enabled and client sends correct Content-Type."
      );
      return res.status(400).json({
        error: "Request body missing or empty.",
        hint: "Enable body parsing (app.use(express.json()) / app.use(express.urlencoded(...))) and set Content-Type header.",
        contentType: contentType || "not provided",
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
    return res.json(user);
  } catch (error) {
    console.error("Update user error:", error);
    const payload = { error: isProd ? "Failed to update user" : error.message };
    if (!isProd) payload.stack = error.stack;
    return res.status(400).json(payload);
  }
};

// Delete User
const deleteUser = async (req = {}, res = {}) => {
  try {
    const { id } = req.params || {};

    const user = await User.findByIdAndDelete(id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    return res.json({ message: "User deleted successfully", user });
  } catch (error) {
    console.error("Delete user error:", error);
    const payload = { error: isProd ? "Failed to delete user" : error.message };
    if (!isProd) payload.stack = error.stack;
    return res.status(400).json(payload);
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
