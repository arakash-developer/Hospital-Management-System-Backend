require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const wellcomeRoutes = require("./routes/wellcome");
const userRoutes = require("./routes/users");
const loginRoutes = require("./routes/login");

app.use("/api/wellcome", wellcomeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/login", loginRoutes);

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
