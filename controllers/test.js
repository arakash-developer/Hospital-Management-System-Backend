const ItemTest = require("../models/test");
const ItemCategory = require("../models/category");

// CREATE TEST
const createTest = async (req, res) => {
  try {
    const {
      testname,
      unittest,
      normalrange,
      table,
      tableidfield,
      testcharge,
      category,
    } = req.body;

    const categoryExists = await ItemCategory.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ message: "Category not found" });
    }

    const test = new ItemTest({
      testname,
      unittest,
      normalrange,
      table,
      tableidfield,
      testcharge,
      category,
    });
    const saved = await test.save();

    res.status(201).json({
      message: "Test created successfully",
      testId: saved._id,
    });
  } catch (error) {
    console.error("Error creating test:", error);
    res.status(500).json({ message: "Failed to create test" });
  }
};

// GET ALL TESTS
const getTests = async (req, res) => {
  try {
    const tests = await ItemTest.find({ status: "active" })
      .populate("table")
      .populate("tableidfield")
      .populate({
        path: "category",
        populate: { path: "department" }, // <-- populate department inside category
      })
      .sort({ _id: -1 });

    res.status(200).json(tests);
  } catch (error) {
    console.error("Error fetching tests:", error);
    res.status(500).json({
      message: "Failed to fetch tests",
      error: error.message,
    });
  }
};

// GET TESTS BY CATEGORY
const getTestsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const tests = await ItemTest.find({ category: categoryId });

    res.status(200).json(tests);
  } catch (error) {
    console.error("Error fetching tests by category:", error);
    res.status(500).json({ message: "Failed to fetch tests for category" });
  }
};

// UPDATE TEST
const updateTest = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      testname,
      unittest,
      normalrange,
      table,
      tableidfield,
      testcharge,
      category,
    } = req.body;

    // Validate category if provided
    if (category) {
      const categoryExists = await ItemCategory.findById(category);
      if (!categoryExists) {
        return res.status(404).json({ message: "Category not found" });
      }
    }

    const updated = await ItemTest.findByIdAndUpdate(
      id,
      {
        testname,
        unittest,
        normalrange,
        table,
        tableidfield,
        testcharge,
        category,
      },
      { new: true }
    ).populate({
      path: "category",
      populate: { path: "department" },
    });

    if (!updated) {
      return res.status(404).json({ message: "Test not found" });
    }

    res.status(200).json({
      message: "Test updated successfully",
      test: updated,
    });
  } catch (error) {
    console.error("Error updating test:", error);
    res.status(500).json({ message: "Failed to update test" });
  }
};



// DELETE TEST (soft delete)
const deleteTest = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await ItemTest.findByIdAndUpdate(
      id,
      { status: "inactive" },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Test not found" });
    }

    res.status(200).json({ message: "Test deleted successfully" });
  } catch (error) {
    console.error("Error deleting test:", error);
    res.status(500).json({ message: "Failed to delete test" });
  }
};

module.exports = {
  createTest,
  getTests,
  getTestsByCategory,
  updateTest,
  deleteTest,
};
