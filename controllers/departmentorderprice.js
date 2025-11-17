const mongoose = require("mongoose");
const Test = require("../models/test");

const calculateDepartmentCharges = async (req, res) => {
  try {
    const { testIds } = req.body;

    if (!testIds || !Array.isArray(testIds) || testIds.length === 0) {
      return res.status(400).json({ message: "No test IDs provided" });
    }

    const result = await Test.aggregate([
      {
        $match: {
          _id: { $in: testIds.map(id => new mongoose.Types.ObjectId(id)) }
        }
      },

      // Get category
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category"
        }
      },
      { $unwind: "$category" },

      // Get department from category
      {
        $lookup: {
          from: "departments",
          localField: "category.department",
          foreignField: "_id",
          as: "department"
        }
      },
      { $unwind: "$department" },

      // Group by department and sum testcharge
      {
        $group: {
          _id: "$department._id",
          departmentName: { $first: "$department.name" },
          totalCharge: { $sum: "$testcharge" }
        }
      },

      // final output clean
      {
        $project: {
          _id: 0,
          department: "$departmentName",
          totalCharge: 1
        }
      }
    ]);

    // Custom sorting order
    const customOrder = ["Pathology", "Xray", "ECG", "Ultra Sono"];

    result.sort((a, b) => {
      const aIndex = customOrder.indexOf(a.department);
      const bIndex = customOrder.indexOf(b.department);

      // both not in custom order → leave as default
      if (aIndex === -1 && bIndex === -1) return 0;

      // a not in order → goes last
      if (aIndex === -1) return 1;

      // b not in order → goes last
      if (bIndex === -1) return -1;

      // both in list → compare by their index
      return aIndex - bIndex;
    });

    return res.status(200).json(result);

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { calculateDepartmentCharges };
