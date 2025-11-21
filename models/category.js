const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  carried: {
    type: String,
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"], // only these two allowed
    default: "active", // default = active
  }
});

module.exports = mongoose.model("Category", categorySchema);
