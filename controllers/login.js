const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    // find user by username only
    const foundUser = await user.findOne({ username });
    if (!foundUser) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // compare provided password with hashed password from DB
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // create JWT
    const payload = {
      userId: foundUser._id,
      username: foundUser.username,
      role: foundUser.role,
      name: foundUser.name,
    };
    const secret = process.env.JWT_SECRET || "change_this_jwt_secret";
    const token = jwt.sign(payload, secret);

    return res.status(200).json({
      message: "Login successful",
      token, // JWT returned to client
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  login,
};
