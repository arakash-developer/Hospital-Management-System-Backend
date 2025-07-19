const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  try {
const { name, password, role,username, email, status } = req.body;

    // Validate required fields

    if (!password  || !email || !username) {
      return res
        .status(400)
        .json({ error: "Password, email and username are required" });
    }

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password,
        role,
        name,
        status,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("Create user error:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

const getUsers = async (req, res) => {
  try {
    // res.json({users: "hello"});
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

module.exports = {
  createUser,
  getUsers,
};
