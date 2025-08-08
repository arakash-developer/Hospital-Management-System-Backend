const express = require("express");
const router = express.Router();
const { login } = require("../controllers/loginController");

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/", login);

module.exports = router;
