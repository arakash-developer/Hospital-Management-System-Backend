const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: Number, // optional
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ItemCategory",
    required: true,
  },
});

module.exports = mongoose.model("Test", testSchema);
