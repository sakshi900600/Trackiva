# 🚀 Trackiva Backend

Trackiva is a job application tracking platform designed to help users manage job applications, resumes, interview preparation, and productivity in a structured way.

This repository contains the **backend API**, built with Node.js, Express, and MongoDB.

---

# 🧠 Features

### 🔐 Authentication

* Register & Login (JWT आधारित)
* Google Authentication (ID token based)
* Secure password hashing

---

### 💼 Jobs Management (Core)

* Create, update, delete jobs
* Filter by status & platform
* Search by company/role
* Pagination support

---

### 📄 Resume Management

* Upload PDF resumes (Cloudinary)
* Rename resumes
* Delete resumes
* Track jobs using a resume

---

### 🎯 Interview Preparation

* Store interview questions & answers
* Categorize (HR, Technical, Behavioral)
* Link questions to jobs

---

### ✅ Todo System

* Add, update, delete tasks
* Mark complete/incomplete

---

### 📊 Analytics

* Total applications
* Interviews & offers
* Response rate
* Platform-wise distribution
* Time-based filtering (week/month/year)

---

### 💬 Daily Quotes

* Static curated quotes
* Same quote for all users daily (UTC-based)
* Includes author

---

# 🏗️ Tech Stack

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Cloudinary (file storage)
* Multer (file upload)
* Google Auth Library

---

# 📁 Project Structure

```
backend/
│
├── src/
│   ├── config/
│   ├── middleware/
│   ├── utils/
│   ├── modules/
│   │   ├── auth/
│   │   ├── jobs/
│   │   ├── resume/
│   │   ├── interview-prep/
│   │   ├── todo/
│   │   ├── analytics/
│   │   └── quote/
│   │
│   └── app.js
│
├── server.js
├── package.json
└── .env
```

---

# ⚙️ Environment Variables

Create a `.env` file in root:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

GOOGLE_CLIENT_ID=your_google_client_id

CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret

NODE_ENV=development
```

---

# 🚀 Getting Started

### 1. Install dependencies

```
npm install
```

### 2. Run server

```
npm run dev
```

Server runs on:

```
http://localhost:5000
```

---

# 🔑 API Base URL

```
/api
```

---

# 📌 Main Endpoints

### Auth

```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/google
```

---

### Jobs

```
POST   /api/jobs
GET    /api/jobs
GET    /api/jobs/:id
PUT    /api/jobs/:id
DELETE /api/jobs/:id
```

---

### Resume

```
POST   /api/resume
GET    /api/resume
PUT    /api/resume/:id
DELETE /api/resume/:id
GET    /api/resume/:id/jobs
```

---

### Interview Prep

```
POST   /api/interview
GET    /api/interview
GET    /api/interview/:id
PUT    /api/interview/:id
DELETE /api/interview/:id
```

---

### Todo

```
POST   /api/todo
GET    /api/todo
PUT    /api/todo/:id
DELETE /api/todo/:id
```

---

### Analytics

```
GET /api/analytics?range=all_time
```

---

### Quote

```
GET /api/quote
```

---

# 🔐 Authentication

All protected routes require:

```
Authorization: Bearer <token>
```

---

# 🧪 Testing

* Postman collection included
* Supports auto token saving
* Covers all modules

---

# 📈 Future Enhancements

* AI Resume Analysis
* Interview Answer Feedback
* Job Scraping
* Notifications & Reminders
* Admin Dashboard
* Export to CSV/Excel

---

# ⚡ Best Practices Followed

* Modular architecture
* Service layer separation
* Global error handling
* JWT-based auth
* Scalable schema design
* Clean & consistent API responses

---

# 👨‍💻 Author

Built with focus on real-world product architecture and scalability.

---

# 📄 License

This project is for educational and personal use.
