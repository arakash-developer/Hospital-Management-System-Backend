const express = require("express");
const router = express.Router();

const {
  createTest,
  getTests,
  getTestsByCategory,
  updateTest,
  deleteTest,
} = require("../controllers/test");

const isReceiption = require("../middlewares/isreceiption");

// Create test
router.post("/", isReceiption, createTest);

// Get all tests
router.get("/", getTests);

// Get tests by category
router.get("/category/:categoryId", getTestsByCategory);

// Update test
router.put("/:id", isReceiption, updateTest);

// Delete test
router.delete("/:id", isReceiption, deleteTest);

module.exports = router;
