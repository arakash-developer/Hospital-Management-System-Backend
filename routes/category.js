const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");

const isReceiption = require("../middlewares/isreceiption");

// Create Category (needs departmentId)
router.post("/", isReceiption, createCategory);

// Get all categories
router.get("/", getCategories);

// Update category
router.put("/:id", isReceiption, updateCategory);

// Delete category
router.delete("/:id", isReceiption, deleteCategory);

module.exports = router;
