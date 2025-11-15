const express = require("express");
const { wellcome } = require("../controllers/wellcome");

const router = express.Router();

router.get("/", wellcome);

module.exports = router;
