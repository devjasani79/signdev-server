const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fileName: { type: String, required: true },
  pdfBuffer: { type: Buffer, required: true }, // Store binary data
  status: {
    type: String,
    enum: ["unsigned", "signed", "pending"],
    default: "unsigned",
  },
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Document", documentSchema);
