const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

const createUser = async (req, res) => {
  try {
    // const { name, password, role, organization } = req.body;

    // if (!password || !role) {
    //   return res.status(400).json({ error: 'Password and role are required' });
    // }

    // // Hash password before saving
    // const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name:"akash",
        password: "ss",
        role:"admin",
        organization:"asss",
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

const getUsers = async (req, res) => {
  try {
    // res.json({users: "hello"});
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

module.exports = {
  createUser,
  getUsers,
};
