const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"], // only these two allowed
    default: "active", // default = active
  },
});

module.exports = mongoose.model("Department", departmentSchema);
