const Document = require("../models/Document");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

// Upload new PDF
const uploadDocument = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const doc = new Document({
      user: req.user._id,
      fileName: req.file.originalname,
      pdfBuffer: req.file.buffer,
    });

    await doc.save();

    res.status(201).json({
      message: "Document uploaded successfully",
      _id: doc._id,
      fileName: doc.fileName,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Failed to upload document" });
  }
};

// List all documents of a user
const listUserDocuments = async (req, res) => {
  try {
    const docs = await Document.find({ user: req.user._id })
      .select("-pdfBuffer")
      .sort({ uploadedAt: -1 });

    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch documents" });
  }
};

// Get one document metadata
const getDocumentById = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id).select("-pdfBuffer");
    if (!doc || doc.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }
    res.json(doc);
  } catch (err) {
    res.status(404).json({ message: "Document not found" });
  }
};

// Stream full PDF
const streamPdf = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc || !doc.pdfBuffer) {
      return res.status(404).json({ message: "PDF not found" });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="${doc.fileName}"`);
    res.send(doc.pdfBuffer);
  } catch (err) {
    console.error("Stream error:", err);
    res.status(500).json({ message: "Failed to stream PDF" });
  }
};

const updateDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Document not found" });

    doc.pdfBuffer = req.file.buffer;
    doc.fileName = req.file.originalname;
    doc.status = "signed";
    await doc.save();

    res.json({ _id: doc._id, message: "Document updated" });
  } catch (err) {
    console.error("Error updating document:", err);
    res.status(500).json({ message: "Failed to update document" });
  }
};
const deleteDoc=async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Document.findById(id);
    if (!doc) return res.status(404).json({ msg: "Document not found" });

    await Document.findByIdAndDelete(id);
    res.status(200).json({ msg: "Deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete document" });
  }
};


module.exports = {
  uploadDocument,
  listUserDocuments,
  getDocumentById,
  streamPdf,
  updateDocument,
  deleteDoc
};



