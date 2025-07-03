const Signature = require("../models/Signature");
const Document = require("../models/Document");
const AuditLog = require("../models/audit");

// Save signatures and log audit
exports.saveSignatures = async (req, res) => {
  try {
    const { documentId, signatures } = req.body;

    if (!documentId || !Array.isArray(signatures) || signatures.length === 0) {
      return res.status(400).json({ error: "Invalid payload: documentId or signatures missing" });
    }

    // Save all signatures
    const savedSignatures = await Signature.insertMany(
      signatures.map(sig => ({
        documentId,
        userId: req.user._id,
        x: sig.x,
        y: sig.y,
        page: sig.page,
        status: sig.status || "signed",
        reason: sig.reason || "",
      }))
    );

    // Update document status
    await Document.findByIdAndUpdate(documentId, { status: "signed" });

    // Log audit entry
    await AuditLog.create({
      documentId,
      signer: req.user._id,
      action: "signed",
      ipAddress: req.ip,
    });

    res.status(201).json({ message: "Signatures saved", signatures: savedSignatures });
  } catch (err) {
    console.error("Error saving signatures:", err);
    res.status(500).json({ error: "Failed to save signatures" });
  }
};

// Get all signatures for a document
exports.getSignaturesForDocument = async (req, res) => {
  try {
    const docId = req.params.docId;
    const signatures = await Signature.find({ documentId: docId });

    res.status(200).json(signatures);
  } catch (err) {
    console.error("Error fetching signatures:", err);
    res.status(500).json({ error: "Failed to fetch signatures" });
  }
};

const jwt = require("jsonwebtoken");

const saveSignature = async (req, res) => {
  try {
    let signerId = req.user?.id;
    let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    if (!signerId && req.body.token) {
      const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);
      signerId = null; // no auth user
      req.shareData = { email: decoded.email };
    }

    // Proceed with signature save logic (pdf-lib, embed, etc.)
    // Then log audit:
    await Audit.create({
      documentId: req.body.documentId,
      signer: signerId,
      ipAddress: ip,
      action: "signed",
    });

    res.json({ message: "Document signed and saved." });
  } catch (err) {
    console.error("Signature error:", err);
    res.status(500).json({ message: "Signature failed" });
  }
};
exports.saveSignature = saveSignature;