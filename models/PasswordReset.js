const mongoose = require("mongoose");

const passwordResetSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  otp: {
    type: String,
    required: true,
  },

  expiresAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("PasswordReset", passwordResetSchema);

// This file defines the password reset schema for handling password reset requests.
// It uses Mongoose to create a schema that includes fields for the user's email, OTP, and expiration time of the OTP.