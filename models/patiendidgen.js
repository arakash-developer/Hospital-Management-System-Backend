const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // e.g., "patientid"
  seq: { type: Number, default: 0 } // start from 0 → first patient will be 1
});

module.exports = mongoose.model("Counter", counterSchema);
