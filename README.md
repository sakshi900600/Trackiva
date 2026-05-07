# 📋 Trackiva - Job Application Tracking Platform

A comprehensive full-stack application designed to help job seekers efficiently manage their job applications, resumes, interview preparation, and productivity.

---

## 📌 Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [Project Folders](#-project-folders)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Project Overview

Trackiva is an all-in-one platform that helps job seekers:
- Track all job applications in one place
- Manage resumes and cover letters
- Prepare for interviews with question banks
- Monitor application analytics
- Stay productive with to-do lists
- Get daily motivational quotes

Built with modern technologies, Trackiva provides an intuitive user interface combined with a robust backend API.

---

## ✨ Features

### 🔐 **Authentication & Security**
- User registration and login
- Google OAuth integration
- JWT-based authentication
- Secure password hashing with bcryptjs
- Forgot/Reset password functionality

### 💼 **Job Application Management**
- Create, read, update, and delete job applications
- Track application status
- Add notes, links, and contacts per application
- Set reminders for follow-ups
- Filter by platform and status
- Advanced search and pagination

### 📄 **Resume Management**
- Upload PDF resumes to Cloudinary
- Organize multiple resumes
- Rename and delete resumes
- Track which resume was used for each job

### 🎯 **Interview Preparation**
- Store interview questions and answers
- Categorize questions (HR, Technical, Behavioral)
- Accessible knowledge base for revision

### ✅ **Productivity Tools**
- To-do list management
- Task progress tracking
- Daily tasks and reminders

### 📊 **Analytics Dashboard**
- Total applications count
- Interview and offer statistics
- Response rate calculation
- Platform-wise distribution
- Time-based filtering (weekly, monthly, yearly)

### 💬 **Daily Motivation**
- Curated daily quotes
- Same quote for all users (UTC-based)
- Author attribution

### 📝 **Cover Letters**
- Manage cover letter templates
- Create customized cover letters per job

### 📈 **Reporting & Insights**
- All application stats
- Platform-wise performance metrics
- Application trend analysis

---

## 🛠️ Tech Stack

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication token
- **Cloudinary** - Cloud file storage
- **Multer** - File upload handling
- **Nodemailer** - Email service
- **Bcryptjs** - Password encryption
- **Google Auth Library** - OAuth integration
- **Helmet** - Security headers
- **Morgan** - HTTP request logger
- **CORS** - Cross-origin resource sharing

### **Frontend**
- **React 19** - UI library
- **Vite** - Build tool & dev server
- **React Router** - Navigation
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **React Hot Toast** - Notifications
- **React Icons** - Icon library
- **Lucide React** - Modern icons
- **Google OAuth** - Authentication

---

## 📁 Project Structure

```
Trackiva/
│
├── trackiva-backend/
│   ├── src/
│   │   ├── config/              # Configuration files
│   │   │   ├── env.js          # Environment setup
│   │   │   ├── db.js           # MongoDB connection
│   │   │   └── cloudinary.js   # Cloudinary setup
│   │   │
│   │   ├── middleware/          # Express middleware
│   │   │   ├── auth.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   └── validate.middleware.js
│   │   │
│   │   ├── modules/             # Feature modules
│   │   │   ├── auth/
│   │   │   ├── jobs/
│   │   │   ├── resume/
│   │   │   ├── interview-prep/
│   │   │   ├── todo/
│   │   │   ├── analytics/
│   │   │   ├── quote/
│   │   │   ├── report/
│   │   │   ├── cover-letter/
│   │   │   └── platform/
│   │   │
│   │   ├── utils/               # Utility functions
│   │   │   ├── apiResponse.js
│   │   │   ├── logger.js
│   │   │   ├── mailer.js
│   │   │   └── ...
│   │   │
│   │   └── app.js               # Express app setup
│   │
│   ├── server.js                # Server entry point
│   ├── package.json
│   ├── API.md                   # API Documentation
│   └── README.md
│
├── trackiva-frontend/
│   ├── src/
│   │   ├── api/                 # API integration files
│   │   ├── components/          # Reusable React components
│   │   ├── pages/               # Page components
│   │   ├── layout/              # Layout components
│   │   ├── hooks/               # Custom React hooks
│   │   ├── utils/               # Utility functions
│   │   ├── data/                # Static data
│   │   ├── assets/              # Images, fonts, etc
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── public/                  # Static files
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── package.json
│   ├── index.html
│   └── README.md
│
└── README.md                    # This file
```

---

## 💻 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud atlas)
- Cloudinary account (for file storage)
- Google OAuth credentials (optional)
- SMTP credentials for email (optional)

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-repo/trackiva.git
cd trackiva
```

### Step 2: Backend Setup

```bash
cd trackiva-backend
npm install
```

### Step 3: Frontend Setup

```bash
cd ../trackiva-frontend
npm install
```

---

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in `trackiva-backend/` with the following variables:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=your connection string

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Configuration (for password reset)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### Frontend Environment Variables

Create a `.env` file in `trackiva-frontend/` with the following variables:

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

---

## 🚀 Running the Application

### Backend Development Server

```bash
cd trackiva-backend
npm start
# or for development with hot reload
npm run dev
```

The backend API will run on `http://localhost:5000`

### Frontend Development Server

```bash
cd trackiva-frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Production Build

**Backend:**
```bash
cd trackiva-backend
npm run build
```

**Frontend:**
```bash
cd trackiva-frontend
npm run build
npm run preview
```

---


## 🔗 API Documentation

For detailed API endpoints, parameters, and examples, see [trackiva-backend/API.md](./trackiva-backend/API.md).

Quick links to main endpoints:
- **Authentication**: `/api/auth`
- **Jobs**: `/api/jobs`
- **Resumes**: `/api/resume`
- **Interview Prep**: `/api/interview`
- **To-Do**: `/api/todo`
- **Analytics**: `/api/analytics`
- **Reports**: `/api/reports`
- **Cover Letters**: `/api/cover-letter`
- **Quotes**: `/api/quote`

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## ⚡ Build with love & Passion by - **Sakshi**



