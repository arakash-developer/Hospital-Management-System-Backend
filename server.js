const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const doctorRoute = require("./routes/doctorRoute");
const app = express();
app.use(express.json());
app.use(cors());
const prisma = new PrismaClient();
app.use("/api/users", userRoutes);
app.use("/api/doctors", doctorRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
