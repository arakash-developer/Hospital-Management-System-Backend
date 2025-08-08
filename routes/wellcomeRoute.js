const express = require("express");
const router = express.Router();
const { getwellcome, getWelcome } = require("../controllers/wellcomeController");

// Create a new user
router.get("/", getWelcome);

module.exports = router;
