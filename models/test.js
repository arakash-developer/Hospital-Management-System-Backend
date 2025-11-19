const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  testname: {
    type: String,
    required: true,
  },
  unittest: {
    type: String,
    required: true,
  },
  normalrange: {
    type: String,
    required: true,
  },
  table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
    required: true,
  },
  tableidfield: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TableIdField",
    required: true,
  },
  testcharge: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

module.exports = mongoose.model("Test", testSchema);
