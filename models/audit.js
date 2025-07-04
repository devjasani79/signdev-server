const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema({
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
    required: true,
  },
  signer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false, // for public view/sign
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
