const mongoose = require("mongoose");
const tableIdFieldSchema = new mongoose.Schema({
  tableidfield: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
    required: true,
  },
});

module.exports = mongoose.model("TableIdField", tableIdFieldSchema);
