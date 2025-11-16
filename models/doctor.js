const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  doctorname: {
    type: String,
    required: true,
  },
  doctortitle: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },

  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country",
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Doctor", doctorSchema);
