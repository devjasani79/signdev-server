# 📄 SignDev Server

This is the **backend server** for **SignDev**, a digital document signing platform. It handles user authentication, document uploads, public sharing, signature embedding, and audit trails — built with modern Node.js stack.

---

## 🚀 Features

- ✅ User Registration, Login & OTP-based Password Reset
- 🔐 Secure JWT-based Authentication
- 📤 PDF Upload & Buffer Storage in MongoDB
- 🔗 Public Link Sharing via Email (expires after 48 hrs)
- ✍️ Signature Embedding with Coordinates
- 🕵️‍♂️ Full Audit Trail: View, Sign, Reject logs with IP
- 📩 Email Notifications using Gmail SMTP
- ☁️ Optional Cloudinary File Upload Support (legacy)

---

## 🛠 Tech Stack

| Layer          | Tools Used                        |
|----------------|-----------------------------------|
| Backend        | Node.js, Express.js               |
| Database       | MongoDB, Mongoose                 |
| Auth           | JWT, bcrypt                       |
| Email          | Nodemailer (Gmail SMTP)           |
| File Handling  | multer (memory), pdf-lib          |
| Cloud Storage  | Cloudinary (optional integration) |

---

## 📦 Installation

### ⚙️ Prerequisites

- Node.js (v18+ recommended)
- MongoDB database (Atlas or local)
- Gmail (with App Password enabled)
- Cloudinary account (optional)

### 🧩 Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/signdev-server.git
   cd signdev-server
