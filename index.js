const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDb = require("./config/dbConnection");

const app = express();
const port = process.env.PORT || 5000;

// Connect MongoDB
connectDb();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// API Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/docs", require("./routes/documentRoutes"));
app.use("/api/signatures", require("./routes/signatureRoutes"));
app.use("/api/audits", require("./routes/audit"));        
app.use("/api/share", require("./routes/share"));
app.use("/api/public-sign", require("./routes/publicSign")); 

// Serve static uploaded PDFs
app.use("/uploads", express.static("uploads"));

// Fallback for unmatched routes (optional)
app.use((req, res) => {
  res.status(404).json({ message: "API route not found" });
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
