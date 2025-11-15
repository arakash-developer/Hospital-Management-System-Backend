const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  }
  ,
    password: {
    type: String,
    required: true,
  },
  role:{
    type: String,
    enum: ['admin', 'doctor', 'nurse', 'patient','receiption'],
    default: 'receptionist'
  }
}, { timestamps: true });

const users = mongoose.model("User", userSchema);
module.exports = users;