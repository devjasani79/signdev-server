const mongoose = require("mongoose");

const signatureSchema = new mongoose.Schema({
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  x: Number,
  y: Number,
  page: Number,

  status: {
    type: String,
    enum: ["unsigned", "signed", "pending"],
    default: "unsigned",
  },

  reason: {
    type: String,
    default: "",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Signature", signatureSchema);
