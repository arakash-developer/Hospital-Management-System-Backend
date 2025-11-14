const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    username: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true }, // adjust allowed values elsewhere if needed
  },
  { timestamps: true }
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
