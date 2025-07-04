const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const upload = require("../middleware/multer");
const {
  uploadDocument,
  listUserDocuments,
  getDocumentById,
  streamPdf,
  
} = require("../controllers/documentController");

const router = express.Router();

router.post("/upload", verifyToken, upload.single("file"), uploadDocument);
router.get("/", verifyToken, listUserDocuments);
router.get("/view/:id", streamPdf); 
router.get("/:id", verifyToken, getDocumentById);
router.delete("/:id", requireAuth, deleteDoc);

module.exports = router;

// This file defines the document-related routes for uploading, listing, and viewing documents.
// It uses the Express router to handle POST requests for uploading documents and GET requests for listing and viewing documents.