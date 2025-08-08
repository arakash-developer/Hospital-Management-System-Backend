const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const adminAuthenticateToken = require("../middlewares/admin/adminAuthenticateToken");

router.post("/", createUser);

// Get all users
router.get("/", adminAuthenticateToken, getUsers);

// Get single user by ID
router.get("/:id", getUserById);

// Update user by ID
router.put("/:id", updateUser);

// Delete user by ID
router.delete("/:id", deleteUser);

module.exports = router;

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create A New User
 *     description: required( name / username / email / password / status ) default (none)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:             # ✅ Add this
 *               - name
 *               - username
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "xyz"
 *               username:
 *                 type: string
 *                 example: "xyz12345"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "strongPassword123"
 *               status:
 *                 type: string
 *                 enum: ["ACTIVE", "INACTIVE"]
 *                 example: "ACTIVE"
 *     responses:
 *       201:
 *         description: User created
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */

// Create a new user
