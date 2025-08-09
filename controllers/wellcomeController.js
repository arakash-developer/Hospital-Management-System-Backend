const { PrismaClient } = require("../prisma/generated/clientPg");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

// welcomeController.js
const getWelcome = (req, res) => {
  res.json({ message: "Welcome" });
};


module.exports = {
  getWelcome,
};
