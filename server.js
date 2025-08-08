const express = require("express");
const { swaggerUi, specs } = require("./swagger");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // Add this import
const userRoutes = require("./routes/userRoutes");
const doctorRoute = require("./routes/doctorRoute");
const hospitalRoutes = require("./routes/hospitalRoute");
const hospitalUserRoutes = require("./routes/hospitalUserRoute");
const loginRoute = require("./routes/loginRoute");
const wellcomeRoute = require("./routes/wellcomeRoute");

const app = express();
app.use(express.json());
app.use(cookieParser()); // This should be before any route handling
// Swagger API docs
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));
// CORS configuration to accept multiple origins
const allowedOrigins = [
  "http://localhost:5173", // Vite frontend 1
  "http://localhost:4173", // Vite frontend 2
  "https://bdhms.vercel.app", // Production frontend
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies to be sent with requests
};

app.use(cors(corsOptions));
const prisma = new PrismaClient();
// ...existing code...
app.use("/api/wellcome", wellcomeRoute);
app.use("/api/users", userRoutes);
app.use("/api/doctors", doctorRoute);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/hospital-users", hospitalUserRoutes);
app.use("/api/login", loginRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
