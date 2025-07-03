// routes/audits.js
const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const Audit = require("../models/audit");

const router = express.Router();

router.get("/:documentId", verifyToken, async (req, res) => {
  try {
    const logs = await Audit.find({ documentId: req.params.documentId })
      .populate("signer", "name email")
      .sort({ timestamp: -1 });

    res.json(logs);
  } catch (err) {
    console.error("Failed to fetch audit logs:", err);
    res.status(500).json({ error: "Failed to fetch audit logs" });
  }
});

module.exports = router;

// This file defines the audit routes for fetching audit logs related to document signing.    
// It uses the Express router to handle GET requests for retrieving audit logs for a specific document.