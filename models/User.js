const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model("User", userSchema);


// This file defines the User model for MongoDB using Mongoose.
// It includes fields for name, email, and password, with email being unique.