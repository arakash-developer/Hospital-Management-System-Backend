require('dotenv').config();  // Ensure dotenv is required at the top

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier = email or username

    if (!identifier || !password) {
      return res
        .status(400)
        .json({ error: "Email/Username and password are required" });
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { username: identifier }],
      },
      include: {
        hospitals: {
          include: {
            hospital: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Add role to the payload (assuming the role is part of the user object)
    const role = user.hospitals[0]?.role;  // Make sure this is how you store the user's role in the DB

    // Create JWT token with the role
    const payload = { 
      userId: user.id, 
      username: user.username, 
      email: user.email, 
      role: role // Include role in the JWT payload
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Remove the password from user data before sending it
    const { password: _, ...userData } = user;

    // Set the token as a cookie
    res.cookie('token', token, {
      httpOnly: true, // Prevent client-side JS from accessing the token
    });

    // Return user data along with the token in the response body
    res.status(200).json({
      user: userData,
      token, // Return the JWT token in the response body
    })

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
};

module.exports = { login };
