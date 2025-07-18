const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  try {
    const { name, password, role, organization, email } = req.body;
    // Validate required fields

    if (!password || !role || !email) {
      return res
        .status(400)
        .json({ error: "Password, role and email are required" });
    }

    const user = await prisma.user.create({
      data: {
        email,
        password,
        role,
        name,
        organization,
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
