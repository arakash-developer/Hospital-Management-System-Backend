const mongoose = require("mongoose");
const category = require("./category");

const tableSchema = new mongoose.Schema({
  tablename: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"], // only these two allowed
    default: "active", // default = active
  },
});

module.exports = mongoose.model("Table", tableSchema);
