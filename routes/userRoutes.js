const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const authenticateToken = require("../middlewares/admin/adminAuthenticateToken");

// Create a new user
router.post("/", createUser);

// Get all users
router.get("/",authenticateToken,getUsers);

// Get single user by ID
router.get("/:id", getUserById);

// Update user by ID
router.put("/:id", updateUser);

// Delete user by ID
router.delete("/:id", deleteUser);

module.exports = router;
