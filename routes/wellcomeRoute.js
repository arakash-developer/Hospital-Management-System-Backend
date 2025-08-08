const express = require("express");
const router = express.Router();
const {
  getwellcome,
  getWelcome,
} = require("../controllers/wellcomeController");

/**
 * @swagger
 * /api/wellcome:
 *   get:
 *     summary: Welcome endpoint
 *     tags: [Wellcome]
 *     responses:
 *       200:
 *         description: Welcome message
 */
// Create a new user
router.get("/", getWelcome);

module.exports = router;
