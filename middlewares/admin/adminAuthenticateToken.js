const jwt = require("jsonwebtoken");

const adminAuthenticateToken = (req, res, next) => {
  // Check for the token in the Authorization header (Bearer token) or cookies
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // Authorization: Bearer <token>
console.log(token);

  if (!token) {
    return res.status(401).json({ error: "Authentication token is missing" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }
    console.log(user.hospitals);

    // Check if the user is an admin (you can modify this based on your role structure)
    if (user.hospitals[0].role !== "ADMIN") {
      return res
        .status(403)
        .json({ error: "You do not have the required admin role" });
    }

    // Attach the user information to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  });
};

module.exports = adminAuthenticateToken;
