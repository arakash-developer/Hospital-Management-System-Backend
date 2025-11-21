const Department = require("../models/department");

const departmentCreate = async (req, res) => {
  try {
    const { name } = req.body;
    const dept = new Department({ name });
    const savedDept = await dept.save();

    return res.status(201).json({
      message: "Department created successfully",
      departmentId: savedDept._id,
    });
  } catch (error) {
    console.error("Error creating department:", error);

    return res.status(500).json({ message: "Failed to create Department" });
  }
};

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find({ status: "active" }).sort({
      _id: -1,
    });
    return res.status(200).json(departments);
  } catch (error) {
    console.error("Error fetching departments:", error);
    return res.status(500).json({ message: "Failed to fetch Departments" });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const deptId = req.params.id;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Department name is required" });
    }

    const updatedDept = await Department.findByIdAndUpdate(
      deptId,
      { name },
      { new: true, runValidators: true } // ensures validation runs
    );

    if (!updatedDept) {
      return res.status(404).json({ message: "Department not found" });
    }

    return res.status(200).json({
      message: "Department updated successfully",
      department: updatedDept,
    });
  } catch (error) {
    console.error("Error in updateDepartment:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const deptId = req.params.id;

    const updatedDept = await Department.findByIdAndUpdate(
      deptId,
      { status: "inactive" },
      { new: true }
    );

    if (!updatedDept) {
      return res.status(404).json({ message: "Department not found" });
    }

    return res.status(200).json({
      message: "Department deactivated successfully (status = inactive)",
      department: updatedDept,
    });
  } catch (error) {
    console.error("Error deleting department:", error);
    return res.status(500).json({ message: "Failed to deactivate Department" });
  }
};

module.exports = {
  departmentCreate,
  getDepartments,
  updateDepartment,
  deleteDepartment,
};
