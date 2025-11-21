const ItemCategory = require("../models/category");
const Department = require("../models/department");

// CREATE CATEGORY
const createCategory = async (req, res) => {
  try {
    const { name, department, carried } = req.body;

    // Check Department exists
    const deptExists = await Department.findById(department);
    if (!deptExists) {
      return res.status(404).json({ message: "Department not found" });
    }

    const category = new ItemCategory({ name, department, carried });
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
    const categories = await ItemCategory.find({ status: "active" })
      .populate("department")
      .sort({ _id: -1 });
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
    const { name, carried } = req.body;

    const updated = await ItemCategory.findByIdAndUpdate(
      id,
      { name, carried },
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
// SOFT DELETE CATEGORY (status = inactive)
const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;

    const updated = await ItemCategory.findByIdAndUpdate(
      id,
      { status: "inactive" },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category deactivated successfully (status set to inactive)",
      category: updated,
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Failed to deactivate category" });
  }
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
