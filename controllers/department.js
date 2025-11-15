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
    const departments = await Department.find();
    return res.status(200).json(departments);
  } catch (error) {
    console.error("Error fetching departments:", error);
    return res.status(500).json({ message: "Failed to fetch Departments" });
  }
};

const updateDepartment = (req, res) => {
  try {
    const deptId = req.params.id;
    const newName = req.body.name;
    Department.findByIdAndUpdate(
      deptId,
      { name: newName },
      { new: true },
      (err, updatedDept) => {
        if (err) {
          console.error("Error updating department:", err);
          return res
            .status(500)
            .json({ message: "Failed to update Department" });
        }
        if (!updatedDept) {
          return res.status(404).json({ message: "Department not found" });
        }
        return res.status(200).json({
          message: "Department updated successfully",
          department: updatedDept,
        });
      }
    );
  } catch (error) {
    console.error("Error in updateDepartment:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteDepartment = (req, res) => {
  try {
    const deptId = req.params.id;
    Department.findByIdAndDelete(deptId, (err, deletedDept) => {
      if (err) {
        console.error("Error deleting department:", err);
        return res.status(500).json({ message: "Failed to delete Department" });
      }
      if (!deletedDept) {
        return res.status(404).json({ message: "Department not found" });
      }
      return res
        .status(200)
        .json({ message: "Department deleted successfully" });
    });
  } catch (error) {
    console.error("Error in deleteDepartment:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  departmentCreate,
  getDepartments,
  updateDepartment,
  deleteDepartment,
};
