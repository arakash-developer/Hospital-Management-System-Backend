const ItemCategory = require("../models/category");
const Department = require("../models/department");

// CREATE CATEGORY
const createCategory = async (req, res) => {
  try {
    const { name, department } = req.body;

    // Check Department exists
    const deptExists = await Department.findById(department);
    if (!deptExists) {
      return res.status(404).json({ message: "Department not found" });
    }

    const category = new ItemCategory({ name, department });
    const saved = await category.save();

    res.status(201).json({
      message: "Category created successfully",
      categoryId: saved._id,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Failed to create category" });
  }
};

// GET ALL CATEGORIES
const getCategories = async (req, res) => {
  try {
    const categories = await ItemCategory.find().populate("department");
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

// UPDATE CATEGORY
const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;

    const updated = await ItemCategory.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category updated successfully",
      category: updated,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Failed to update category" });
  }
};

// DELETE CATEGORY
const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;

    const deleted = await ItemCategory.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Failed to delete category" });
  }
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
