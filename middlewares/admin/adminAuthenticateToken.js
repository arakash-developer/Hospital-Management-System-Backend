const jwt = require("jsonwebtoken");

const authenticateToken = (requiredRoles = []) => {
  return (req, res, next) => {
    // Get the token from cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: "Authentication token is missing" });
    }
    console.log("Token found:", token);

    // Verify and decode the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
      }

      // Attach user data to the request object
      req.user = decoded;

      // Check if the user has one of the required roles
      if (requiredRoles.length > 0 && !requiredRoles.includes(req.user.hospitals[0]?.role)) {
        return res.status(403).json({ error: "You do not have permission to access this resource" });
      }

      // Proceed to the next middleware or route handler
      next();
    });
  };
};

module.exports = authenticateToken;
