const express = require("express");
const router = express.Router();

const {
  createCountry,
  getCountries,
  updateCountry,
  deleteCountry,
} = require("../controllers/country");

const isReceiption = require("../middlewares/isreceiption");

// Create
router.post("/", isReceiption, createCountry);

// Get All
router.get("/", isReceiption, getCountries);

// Update
router.put("/:id", isReceiption, updateCountry);

// Delete
router.delete("/:id", isReceiption, deleteCountry);

module.exports = router;
