const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Document = require("../models/Document");

const router = express.Router();

router.get("/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.documentId || !mongoose.Types.ObjectId.isValid(decoded.documentId)) {
      return res.status(400).json({ message: "Invalid document ID in token" });
    }

    const document = await Document.findById(decoded.documentId);
    if (!document || !document.file) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.json({
      fileName: document.fileName,
      documentId: document._id,
      buffer: document.file.toString("base64"),
    });
  } catch (err) {
    console.error("⛔ Token verification or fetch failed:", err);
    return res.status(400).json({ message: "Invalid or expired token" });
  }
});

module.exports = router;

// This file defines the public signing route for retrieving a document by its token.
// It uses the Express router to handle GET requests for fetching a document based on a JWT token.