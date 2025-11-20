const mongoose = require("mongoose");

const patientRegistrationSchema = new mongoose.Schema({
  patientid: { type: String, unique: true},
  date: { type: Date, required: true, default: Date.now },
  deleveryDate: { type: Date, required: true, default: Date.now },
  patientname: { type: String, required: true },
  sex: { type: String, required: true },
  age: { type: String, required: true },
  refDoctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  phone: { type: String, required: true },

  procedures: [
    {
      testname: { type: String, required: true },
      testcharge: { type: Number, required: true },
    },
  ],

  procedurecalculation: [
    {
      depname: { type: String, required: true },
      totalPrice: { type: Number, required: true },
      discount: { type: Number, required: true },
      discounted: { type: Number, required: true },
      due: { type: Number, required: true },
    },
  ],

  totalCharge: { type: Number, default: 0 },
  totalDiscount: { type: Number, default: 0 },
  totalDiscounted: { type: Number, default: 0 },
  totalPaid: { type: Number, default: 0 },
  totalDue: { type: Number, default: 0 },
});

module.exports = mongoose.model(
  "PatientRegistration",
  patientRegistrationSchema
);
