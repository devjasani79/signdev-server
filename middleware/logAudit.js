const Audit = require("../models/audit");

/**
 * Logs audit trail for a document action (viewed/signed/rejected).
 * @param {string} action - The type of audit action.
 */
const logAudit = (action) => {
  return async (req, res, next) => {
    try {
      const ip =
        req.headers["x-forwarded-for"] || req.connection.remoteAddress;

      await Audit.create({
        documentId:
          req.body.documentId || req.params.id || req.query.id || null,
        signer: req.user?.id || req.shareData?.signerId || null,
        action,
        ipAddress: ip,
        reason: req.body.reason || "",
      });
    } catch (err) {
      console.error("❌ Audit log error:", err.message);
    }

    next();
  };
};

module.exports = logAudit;

// This file defines the logAudit middleware for logging actions related to document signing.
// It uses the Audit model to create audit entries for actions like viewed, signed, or rejected documents.