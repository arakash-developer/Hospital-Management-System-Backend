const jwt = require("jsonwebtoken");

// make sure you have a secret key in your environment variables
const SECRET_KEY = process.env.JWT_SECRET;

const isReceiption = (req, res, next) => {
  const token = req.headers["token"]; // or use req.headers["authorization"] with Bearer

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // verify token
    const payload = jwt.verify(token, SECRET_KEY);
    if (payload.role !== "receiption") {
      return res
        .status(403)
        .json({ message: "Access denied: Receiption only" });
    } else {
      next();
    }
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = isReceiption;
