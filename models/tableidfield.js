const mongoose = require("mongoose");
const tableIdFieldSchema = new mongoose.Schema({
  tableidfield: {
    type: String,
    required: true,
  },
  table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"], // only these two allowed
    default: "active", // default = active
  },
});

module.exports = mongoose.model("TableIdField", tableIdFieldSchema);
