require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const wellcomeRoutes = require("./routes/wellcome");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/wellcome", wellcomeRoutes);

// Connect to MongoDB using .env value
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✔"))
  .catch((err) => console.log("MongoDB connection error ❌", err));

// Use PORT from .env
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
