const express = require("express");
require("dotenv").config();
const { connectDB } = require("./db/mongo");

const app = express();

// add JSON body parsing and user routes
app.use(express.json());
// add urlencoded parser to support form submissions and other content-types
app.use(express.urlencoded({ extended: true }));

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

async function start() {
  try {
    await connectDB();
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
