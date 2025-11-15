const user = require("../models/user");
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  // Add your authentication logic here
  const foundUser = await user.findOne({ username, password });
  if (!foundUser) {
    return res.status(401).json({ message: "Invalid username or password" });
  }
  return res
    .status(200)
    .json({
      message: "Login successful",
      userId: foundUser._id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
      username: foundUser.username,
    });
};

module.exports = {
  login,
};
