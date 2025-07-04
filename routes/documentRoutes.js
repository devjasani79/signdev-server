// routes/documentRoutes.js
const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const upload = require("../middleware/multer");
const {
  uploadDocument,
  updateDocument,
  listUserDocuments,
  getDocumentById,
  streamPdf,
  deleteDoc,
} = require("../controllers/documentController");

const router = express.Router();

router.post("/upload", verifyToken, upload.single("file"), uploadDocument);
router.put("/:id", verifyToken, upload.single("file"), updateDocument);
router.get("/", verifyToken, listUserDocuments);
router.get("/view/:id", streamPdf);
router.get("/:id", verifyToken, getDocumentById);
router.delete("/:id", verifyToken, deleteDoc);

module.exports = router;
