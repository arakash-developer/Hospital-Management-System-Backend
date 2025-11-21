const mongoose = require("mongoose");

const dueCollectionHistorySchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "PatientRegistration", required: true },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  procedurecalculation: [
    {
      depname: String,
      totalPrice: Number,
      discount: Number,
      discounted: Number,
      paid: Number,
      due: Number
    }
  ],
  totals: {
    totalCharge: Number,
    totalDiscount: Number,
    totalDiscounted: Number,
    totalPaid: Number,
    totalDue: Number
  },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("DueCollectionHistory", dueCollectionHistorySchema);
