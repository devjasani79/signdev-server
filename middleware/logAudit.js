// middleware/logAudit.js
const Audit = require("../models/audit");

const logAudit = (action) => {
  return async (req, res, next) => {
    try {
      const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

      await Audit.create({
        documentId: req.body.documentId || req.params.id || req.query.id,
        signer: req.user?.id || req.shareData?.signerId || null,
        action,
        ipAddress: ip,
        reason: req.body.reason || "",
      });
    } catch (err) {
      console.error("Audit log error:", err.message);
    }
    next();
  };
};

module.exports = logAudit;
