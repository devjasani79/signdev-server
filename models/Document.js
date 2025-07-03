const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  fileName: {
    type: String,
    required: true,
  },

  pdfBuffer: {
    type: Buffer,
    required: true,
  },

  status: {
    type: String,
    enum: ["unsigned", "signed", "pending"],
    default: "unsigned",
  },

  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Document", documentSchema);

// This file defines the document schema for storing uploaded PDF documents.
// It uses Mongoose to create a schema that includes fields for the user, file name, PDF buffer, status, and upload timestamp.