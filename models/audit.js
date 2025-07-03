const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema({
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
    required: true,
  },

  signer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // optional for public signers
  },

  ipAddress: {
    type: String,
  },

  action: {
    type: String,
    enum: ["viewed", "signed", "rejected"],
    required: true,
  },

  reason: {
    type: String,
    default: "",
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Audit", auditSchema);

// This file defines the audit schema for tracking actions related to document signing.
// It uses Mongoose to create a schema that includes fields for the document ID, signer, IP address, action type, reason, and timestamp.