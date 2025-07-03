const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const {
  saveSignatures,
  getSignaturesForDocument,
} = require("../controllers/signatureController");

const router = express.Router();

router.post("/", verifyToken, saveSignatures);
router.get("/:docId", verifyToken, getSignaturesForDocument);

module.exports = router;

// This file defines the signature-related routes for saving and retrieving signatures.
// It uses the Express router to handle POST requests for saving signatures and GET requests for retrieving signatures for a specific document.