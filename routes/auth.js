const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  requestReset,
  verifyOtp
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/request-reset", requestReset);
router.post("/verify-otp", verifyOtp);

module.exports = router;

// This file defines the authentication routes for user registration, login, password reset requests, and OTP verification.
// It uses the Express router to handle POST requests to the respective endpoints.