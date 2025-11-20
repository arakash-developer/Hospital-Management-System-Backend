const express = require("express");
const router = express.Router();
const isReceiptionist = require("../middlewares/isreceiption");
const { getNextPatientId } = require("../controllers/patientidgen");

// GET: Generate next patient ID
router.get("/", isReceiptionist, getNextPatientId);
module.exports = router;
