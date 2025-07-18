const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const app = express();
app.use(express.json());
app.use(cors());
const prisma = new PrismaClient();
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
