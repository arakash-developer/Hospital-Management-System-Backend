const TableIdField = require("../models/tableidfield");

// CREATE
const createTableIdField = async (req, res) => {
  try {
    const { tableidfield, table } = req.body;

    if (!tableidfield || !table) {
      return res.status(400).json({
        success: false,
        message: "tableidfield and table are required",
      });
    }

    const data = await TableIdField.create({ tableidfield, table });

    res.status(201).json({
      success: true,
      message: "TableIdField created successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL
const getTableIdFields = async (req, res) => {
  try {
    const data = await TableIdField.find({ status: "active" }).populate("table");

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ONE
const getTableIdFieldById = async (req, res) => {
  try {
    const data = await TableIdField.findById(req.params.id).populate("table");

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "TableIdField not found",
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
const updateTableIdField = async (req, res) => {
  try {
    const data = await TableIdField.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "TableIdField not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "TableIdField updated successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
const deleteTableIdField = async (req, res) => {
  try {
    const data = await TableIdField.findByIdAndUpdate(
      req.params.id,
      { status: "inactive" },
      { new: true }
    );

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "TableIdField not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "TableIdField deactivated successfully (status = inactive)",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// EXPORT ALL FUNCTIONS
module.exports = {
  createTableIdField,
  getTableIdFields,
  getTableIdFieldById,
  updateTableIdField,
  deleteTableIdField,
};
