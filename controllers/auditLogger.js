const Audit = require("../models/audit");

const logAudit = (action) => {
  return async (req, res, next) => {
    try {
      const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

      await Audit.create({
        documentId: req.body.documentId || req.params.id,
        userId: req.user._id,
        action,
        ipAddress: ip,
      });
    } catch (err) {
      console.error("Audit log error:", err.message);
    }
    next();
  };
};

module.exports = logAudit;
