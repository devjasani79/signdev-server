const express = require("express");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const verifyToken = require("../middleware/verifyToken");
const Document = require("../models/Document");

const router = express.Router();

// POST /api/share
router.post("/", verifyToken, async (req, res) => {
  const { documentId, recipientEmail } = req.body;

  if (!documentId || !recipientEmail) {
    return res.status(400).json({ message: "Document ID and recipient email are required." });
  }

  try {
    const document = await Document.findById(documentId);
    if (!document) return res.status(404).json({ message: "Document not found" });

    const token = jwt.sign(
      {
        documentId,
        email: recipientEmail,
      },
      process.env.JWT_SECRET,
      { expiresIn: "48h" }
    );

    const link = `${process.env.CLIENT_URL}/sign/${token}`;

    //email using the correct format expected by sendEmail()
    await sendEmail(recipientEmail, "share", { link });

    res.status(200).json({ message: "Link sent successfully", url: link });
  } catch (err) {
    console.error("Error sharing document:", err);
    res.status(500).json({ message: "Failed to share document" });
  }
});

module.exports = router;

// This file defines the share route for sharing documents via email.
// It uses the Express router to handle POST requests for sharing a document by sending an email with a link to the recipient.