const express = require("express");
const router = express.Router();
const { login } = require("../controllers/loginController");
router.post("/", login);



module.exports = router;

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
 *             required:
 *               - email
 *               - password
 *             properties:
 *               identifier:
 *                 type: string
 *                 format: string
 *                 example: arakash.developer@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: akash
 *     responses:
 *       200:
 *         description: Login successful
 */

