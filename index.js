require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// allow all CORS requests
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "token"],
    credentials: true,
  })
);

const wellcomeRoutes = require("./routes/wellcome");
const userRoutes = require("./routes/users");
const loginRoutes = require("./routes/login");
const departmentRoutes = require("./routes/department");
const categoryRoutes = require("./routes/category");
const testRoutes = require("./routes/test");
const countryRoutes = require("./routes/country");
const doctorRoutes = require("./routes/doctor");
const departmentorderpriceRoutes = require("./routes/departmentorderprice");
const PatientRegistration = require("./routes/patientregistration");

app.use("/api/wellcome", wellcomeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/test", testRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/country", countryRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/departmentorderprice", departmentorderpriceRoutes);
app.use("/api/patientregistration", PatientRegistration);

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
