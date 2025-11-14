const mongoose = require("mongoose");

async function connectDB(uri = process.env.MONGO_URI, options = {}) {
  if (!uri) throw new Error("MONGO_URI is required to connect to MongoDB");

  // Remove deprecated options that cause driver warnings if present
  const filtered = { ...options };
  delete filtered.useNewUrlParser;
  delete filtered.useUnifiedTopology;

  // Only pass options if any remain
  const connectArgs = Object.keys(filtered).length ? [uri, filtered] : [uri];

  await mongoose.connect(...connectArgs);
  console.log("MongoDB connected");
}

module.exports = { connectDB };
