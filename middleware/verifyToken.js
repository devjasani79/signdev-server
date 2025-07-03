const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Middleware to verify JWT and attach authenticated user to the request.
 */
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("❌ Token verification error:", err);
    const message =
      err.name === "TokenExpiredError"
        ? "Token expired"
        : "Invalid token";
    return res.status(401).json({ message });
  }
};

module.exports = verifyToken;

// This file defines the verifyToken middleware for authenticating users based on JWT.
// It uses the jsonwebtoken library to verify the token and attaches the authenticated user to the request object.