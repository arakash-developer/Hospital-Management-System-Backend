const mongoose = require("mongoose");

const dueSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "PatientRegistration", required: true },
  paid: { type: Number, default: 0 },       // total paid
  due: { type: Number, default: 0 },        // total due
  discount: { type: Number, default: 0 },   // total discount
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now }   // when this due was recorded
});

module.exports = mongoose.model("Due", dueSchema);
