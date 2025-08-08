const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

// welcomeController.js
const getWelcome = (req, res) => {
  res.json({ message: "Welcome" });
};


module.exports = {
  getWelcome,
};
