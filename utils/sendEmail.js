const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send Email with dynamic content
 * @param {string} to - Recipient email
 * @param {"otp"|"share"} type - Type of email
 * @param {object} payload - Data needed for the email
 */
const sendEmail = async (to, type, payload) => {
  let subject = "";
  let htmlContent = "";

  if (type === "otp") {
    subject = "Your OTP for Password Reset";
    htmlContent = `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2>🔐 Password Reset OTP</h2>
        <p>Use the following OTP to reset your password:</p>
        <h1 style="background: #f0f0f0; padding: 10px 20px; display: inline-block; border-radius: 5px;">
          ${payload.otp}
        </h1>
        <p>This OTP is valid for 10 minutes.</p>
        <br />
        <p style="font-size: 12px; color: gray;">If you didn't request this, please ignore.</p>
      </div>
    `;
  } else if (type === "share") {
    subject = "Document Signature Request";
    htmlContent = `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2>📄 Document Signature Request</h2>
        <p>You have been requested to sign a document. Click the button below to begin:</p>
        <a href="${payload.link}" style="display: inline-block; margin-top: 15px; padding: 10px 20px; background: #4f46e5; color: white; text-decoration: none; border-radius: 5px;">
          View & Sign Document
        </a>
        <p style="margin-top: 20px;">This link will expire in 48 hours.</p>
        <br />
        <p style="font-size: 12px; color: gray;">If you weren't expecting this, you can safely ignore this email.</p>
      </div>
    `;
  } else {
    throw new Error("Invalid email type passed to sendEmail");
  }

  const info = await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to,
    subject,
    html: htmlContent,
  });

  console.log("✅ Email sent to", to, "| ID:", info.messageId);
};

module.exports = sendEmail;

// This file defines the sendEmail utility for sending emails with dynamic content.
// It uses the Nodemailer library to create a transport and send emails based on the type and payload provided.