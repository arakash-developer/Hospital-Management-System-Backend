const mongoose = require("mongoose");
const Counter = require("./patiendidgen"); // import counter model

const patientRegistrationSchema = new mongoose.Schema({
  patientid: { type: String, unique: true },
  date: { type: Date, required: true, default: Date.now },
  deleveryDate: { type: Date, required: true, default: Date.now },
  patientname: { type: String, required: true },
  sex: { type: String, required: true },
  age: { type: String, required: true }, // no unique here
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
  totalCharge: { type: Number, default: 0, required: true },
  totalDiscount: { type: Number, default: 0, required: true },
  totalDiscounted: { type: Number, default: 0, required: true },
  totalPaid: { type: Number, default: 0, required: true },
  totalDue: { type: Number, default: 0, required: true },
});

// Pre-save hook to auto-generate 5-digit patientid
patientRegistrationSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { id: "patientid" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      // 5-digit human-readable ID with leading zeros
      this.patientid = counter.seq.toString().padStart(5, "0");
    } catch (err) {
      return next(err);
    }
  }
  next();
});

const PatientRegistration = mongoose.model(
  "PatientRegistration",
  patientRegistrationSchema
);

module.exports = PatientRegistration;
