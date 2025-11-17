const mongoose = require("mongoose");
const patientRegistrationSchema = new mongoose.Schema({
  patientid: { type: String, required: true, unique: true },
  date: { type: Date, required: true },
  patientname: { type: String, required: true },
  sex: { type: String, required: true },
  refDoctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  age: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  // Procedures array
  procedures: [
    {
      procedureName: { type: String, required: true },
      procedureCharge: { type: Number, required: true },
    },
  ],
  procedurecalculation: [
    {
      name: { type: String, required: true },
      total: { type: Number, required: true },
      discount: { type: Number, required: true },
      discounted: { type: Number, required: true },
      paid: { type: Number, required: true },
      due: { type: Number, required: true },
    },
  ],
  totalCharge: { type: Number, default: 0 },
  totalDiscount: { type: Number, default: 0 },
  totalDiscounted: { type: Number, default: 0 },
  totalPaid: { type: Number, default: 0 },
  totalDue: { type: Number, default: 0 },
});

const PatientRegistration = mongoose.model(
  "PatientRegistration",
  patientRegistrationSchema
);
module.exports = PatientRegistration;
