# 📡 Trackiva API Documentation

Complete API reference for Trackiva Backend Server.

---

## 🔑 Table of Contents

- [Base URL & Authentication](#-base-url--authentication)
- [Response Format](#-response-format)
- [Authentication Endpoints](#-authentication-endpoints)
- [Job Endpoints](#-job-endpoints)
- [Resume Endpoints](#-resume-endpoints)
- [Interview Preparation Endpoints](#-interview-preparation-endpoints)
- [To-Do Endpoints](#-to-do-endpoints)
- [Analytics Endpoints](#-analytics-endpoints)
- [Quote Endpoints](#-quote-endpoints)
- [Report Endpoints](#-report-endpoints)
- [Cover Letter Endpoints](#-cover-letter-endpoints)
- [Platform Endpoints](#-platform-endpoints)
- [Error Handling](#-error-handling)

---

## 🌐 Base URL & Authentication

### Base URL
```
http://localhost:5000
```

### Authentication
Most endpoints require JWT authentication. Include the token in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

### Getting a Token
- Register or login to receive a JWT token
- Include this token in all subsequent requests (except public endpoints)

---

## 📦 Response Format

All API responses follow a standard format:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Actual data here
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Error details (if available)"
}
```

---

## 🔐 Authentication Endpoints

### 1. Register User
**Endpoint:** `POST /api/auth/register`

**Description:** Create a new user account

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "userId123",
    "email": "user@example.com",
    "name": "John Doe",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Codes:**
- `400` - Invalid input or user already exists
- `500` - Server error

---

### 2. Login User
**Endpoint:** `POST /api/auth/login`

**Description:** Login with email and password

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "_id": "userId123",
    "email": "user@example.com",
    "name": "John Doe",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Codes:**
- `400` - Invalid credentials
- `401` - Unauthorized

---

### 3. Google Login
**Endpoint:** `POST /api/auth/google`

**Description:** Login/Register with Google OAuth token

**Request Body:**
```json
{
  "token": "google_id_token_here"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Google login successful",
  "data": {
    "_id": "userId123",
    "email": "user@gmail.com",
    "name": "John Doe",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Codes:**
- `400` - Invalid token
- `401` - Authentication failed

---

### 4. Get User Profile
**Endpoint:** `GET /api/auth/profile`

**Description:** Get current logged-in user profile

**Authentication:** Required ✅

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "_id": "userId123",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-05-01T10:30:00Z"
  }
}
```

**Error Codes:**
- `401` - Unauthorized

---

### 5. Forgot Password
**Endpoint:** `POST /api/auth/forgot-password`

**Description:** Request password reset email

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Password reset email sent"
}
```

**Error Codes:**
- `404` - User not found

---

### 6. Reset Password
**Endpoint:** `POST /api/auth/reset-password/:token`

**Description:** Reset password using reset token from email

**Parameters:**
- `token` - Reset token from email link

**Request Body:**
```json
{
  "password": "newPassword123"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Password reset successful"
}
```

**Error Codes:**
- `400` - Invalid or expired token

---

## 💼 Job Endpoints

All job endpoints require authentication ✅

### 1. Create Job Application
**Endpoint:** `POST /api/jobs`

**Description:** Create a new job application record

**Request Body:**
```json
{
  "company": "Tech Corp",
  "position": "Senior Developer",
  "platform": "LinkedIn",
  "link": "https://example.com/job/123",
  "status": "applied",
  "appliedDate": "2024-05-01",
  "salary": "100000-120000",
  "location": "New York",
  "description": "Great opportunity..."
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Job application created successfully",
  "data": {
    "_id": "jobId123",
    "userId": "userId123",
    "company": "Tech Corp",
    "position": "Senior Developer",
    "platform": "LinkedIn",
    "status": "applied",
    "notes": [],
    "links": [],
    "contacts": [],
    "reminders": [],
    "createdAt": "2024-05-01T10:30:00Z"
  }
}
```

**Error Codes:**
- `400` - Invalid input
- `401` - Unauthorized

---

### 2. Get All Jobs
**Endpoint:** `GET /api/jobs`

**Description:** Retrieve all job applications with filtering and pagination

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Results per page (default: 10)
- `status` - Filter by status (applied, interviewed, rejected, offered)
- `platform` - Filter by platform (LinkedIn, Indeed, etc.)
- `search` - Search by company or position

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Jobs retrieved successfully",
  "data": {
    "jobs": [
      {
        "_id": "jobId123",
        "company": "Tech Corp",
        "position": "Senior Developer",
        "status": "applied",
        "platform": "LinkedIn",
        "appliedDate": "2024-05-01"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalJobs": 45
    }
  }
}
```

**Example Requests:**
```bash
# Get all jobs
GET /api/jobs

# Get jobs with pagination
GET /api/jobs?page=2&limit=20

# Filter by status
GET /api/jobs?status=interviewed

# Search jobs
GET /api/jobs?search=Google
```

---

### 3. Get Job by ID
**Endpoint:** `GET /api/jobs/:id`

**Description:** Get a specific job application details

**Parameters:**
- `id` - Job ID

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Job retrieved successfully",
  "data": {
    "_id": "jobId123",
    "company": "Tech Corp",
    "position": "Senior Developer",
    "platform": "LinkedIn",
    "status": "applied",
    "notes": [
      {
        "_id": "noteId1",
        "content": "Follow up on Monday"
      }
    ],
    "links": [
      {
        "_id": "linkId1",
        "title": "Job Description",
        "url": "https://example.com"
      }
    ],
    "contacts": [],
    "reminders": []
  }
}
```

---

### 4. Update Job
**Endpoint:** `PUT /api/jobs/:id`

**Description:** Update job application details

**Parameters:**
- `id` - Job ID

**Request Body:**
```json
{
  "status": "interviewed",
  "salary": "110000-130000",
  "interviewDate": "2024-05-10"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Job updated successfully",
  "data": {
    "_id": "jobId123",
    "company": "Tech Corp",
    "position": "Senior Developer",
    "status": "interviewed"
  }
}
```

---

### 5. Delete Job
**Endpoint:** `DELETE /api/jobs/:id`

**Description:** Delete a job application

**Parameters:**
- `id` - Job ID

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Job deleted successfully"
}
```

---

### 6. Add Note to Job
**Endpoint:** `POST /api/jobs/:id/notes`

**Description:** Add a note to a job application

**Parameters:**
- `id` - Job ID

**Request Body:**
```json
{
  "content": "HR mentioned interested in second round"
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Note added successfully",
  "data": {
    "_id": "noteId1",
    "content": "HR mentioned interested in second round",
    "createdAt": "2024-05-01T10:30:00Z"
  }
}
```

---

### 7. Update Note
**Endpoint:** `PUT /api/jobs/:id/notes/:noteId`

**Description:** Update a note

**Parameters:**
- `id` - Job ID
- `noteId` - Note ID

**Request Body:**
```json
{
  "content": "Updated note content"
}
```

---

### 8. Delete Note
**Endpoint:** `DELETE /api/jobs/:id/notes/:noteId`

**Description:** Delete a note

**Parameters:**
- `id` - Job ID
- `noteId` - Note ID

---

### 9. Add Link to Job
**Endpoint:** `POST /api/jobs/:id/links`

**Description:** Add a link to a job application

**Parameters:**
- `id` - Job ID

**Request Body:**
```json
{
  "title": "Job Description",
  "url": "https://example.com/job/123"
}
```

---

### 10. Update Link
**Endpoint:** `PUT /api/jobs/:id/links/:linkId`

**Description:** Update a link

**Parameters:**
- `id` - Job ID
- `linkId` - Link ID

**Request Body:**
```json
{
  "title": "Updated Title",
  "url": "https://updated-url.com"
}
```

---

### 11. Delete Link
**Endpoint:** `DELETE /api/jobs/:id/links/:linkId`

**Description:** Delete a link

**Parameters:**
- `id` - Job ID
- `linkId` - Link ID

---

### 12. Add Contact to Job
**Endpoint:** `POST /api/jobs/:id/contacts`

**Description:** Add a contact person for a job

**Parameters:**
- `id` - Job ID

**Request Body:**
```json
{
  "name": "John Smith",
  "email": "john@techcorp.com",
  "phone": "+1-555-0123",
  "position": "Hiring Manager"
}
```

---

### 13. Delete Contact
**Endpoint:** `DELETE /api/jobs/:id/contacts/:contactId`

**Description:** Delete a contact

**Parameters:**
- `id` - Job ID
- `contactId` - Contact ID

---

### 14. Add Reminder
**Endpoint:** `POST /api/jobs/:id/reminders`

**Description:** Set a reminder for a job application

**Parameters:**
- `id` - Job ID

**Request Body:**
```json
{
  "date": "2024-05-10",
  "time": "10:00",
  "message": "Follow up with HR"
}
```

---

### 15. Update Reminder
**Endpoint:** `PUT /api/jobs/:id/reminders/:reminderId`

**Description:** Update a reminder

**Parameters:**
- `id` - Job ID
- `reminderId` - Reminder ID

**Request Body:**
```json
{
  "date": "2024-05-12",
  "message": "Updated reminder"
}
```

---

### 16. Delete Reminder
**Endpoint:** `DELETE /api/jobs/:id/reminders/:reminderId`

**Description:** Delete a reminder

**Parameters:**
- `id` - Job ID
- `reminderId` - Reminder ID

---

## 📄 Resume Endpoints

All resume endpoints require authentication ✅

### 1. Upload Resume
**Endpoint:** `POST /api/resume/upload`

**Description:** Upload a new resume (PDF only)

**Content-Type:** `multipart/form-data`

**Request:**
```
Form Data:
- file: (PDF file)
- title: "My Resume 2024"
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Resume uploaded successfully",
  "data": {
    "_id": "resumeId123",
    "userId": "userId123",
    "title": "My Resume 2024",
    "filename": "resume.pdf",
    "fileSize": "2.5 MB",
    "uploadedAt": "2024-05-01T10:30:00Z"
  }
}
```

**Error Codes:**
- `400` - Only PDF files allowed
- `413` - File too large

---

### 2. Get All Resumes
**Endpoint:** `GET /api/resume`

**Description:** Get all uploaded resumes

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Resumes retrieved successfully",
  "data": {
    "resumes": [
      {
        "_id": "resumeId123",
        "title": "My Resume 2024",
        "filename": "resume.pdf",
        "uploadedAt": "2024-05-01T10:30:00Z"
      }
    ]
  }
}
```

---

### 3. Rename Resume
**Endpoint:** `PUT /api/resume/:id`

**Description:** Rename a resume

**Parameters:**
- `id` - Resume ID

**Request Body:**
```json
{
  "title": "Senior Developer Resume 2024"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Resume renamed successfully",
  "data": {
    "_id": "resumeId123",
    "title": "Senior Developer Resume 2024"
  }
}
```

---

### 4. Delete Resume
**Endpoint:** `DELETE /api/resume/:id`

**Description:** Delete a resume

**Parameters:**
- `id` - Resume ID

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Resume deleted successfully"
}
```

---

### 5. Get Jobs Using Resume
**Endpoint:** `GET /api/resume/:id/jobs`

**Description:** Get all jobs that used this resume

**Parameters:**
- `id` - Resume ID

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Jobs retrieved successfully",
  "data": {
    "jobs": [
      {
        "_id": "jobId123",
        "company": "Tech Corp",
        "position": "Senior Developer",
        "appliedDate": "2024-05-01"
      }
    ]
  }
}
```

---

## 🎯 Interview Preparation Endpoints

All interview endpoints require authentication ✅

### 1. Create Interview Question
**Endpoint:** `POST /api/interview`

**Description:** Add an interview question

**Request Body:**
```json
{
  "question": "Tell me about yourself",
  "answer": "I am a...",
  "category": "HR",
  "topic": "Introduction"
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Question added successfully",
  "data": {
    "_id": "questionId123",
    "question": "Tell me about yourself",
    "answer": "I am a...",
    "category": "HR"
  }
}
```

---

### 2. Get All Interview Questions
**Endpoint:** `GET /api/interview`

**Description:** Get all interview questions

**Query Parameters:**
- `category` - Filter by category (HR, Technical, Behavioral)

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Questions retrieved successfully",
  "data": {
    "questions": [
      {
        "_id": "questionId123",
        "question": "Tell me about yourself",
        "category": "HR"
      }
    ]
  }
}
```

---

### 3. Get Question by ID
**Endpoint:** `GET /api/interview/:id`

**Description:** Get a specific interview question

**Parameters:**
- `id` - Question ID

---

### 4. Update Interview Question
**Endpoint:** `PUT /api/interview/:id`

**Description:** Update an interview question

**Parameters:**
- `id` - Question ID

**Request Body:**
```json
{
  "answer": "Updated answer"
}
```

---

### 5. Delete Interview Question
**Endpoint:** `DELETE /api/interview/:id`

**Description:** Delete an interview question

**Parameters:**
- `id` - Question ID

---

## ✅ To-Do Endpoints

All todo endpoints require authentication ✅

### 1. Create To-Do
**Endpoint:** `POST /api/todo`

**Description:** Create a new to-do item

**Request Body:**
```json
{
  "title": "Prepare for interview",
  "description": "Study data structures",
  "dueDate": "2024-05-10",
  "priority": "high",
  "status": "pending"
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "To-do created successfully",
  "data": {
    "_id": "todoId123",
    "title": "Prepare for interview",
    "status": "pending",
    "createdAt": "2024-05-01T10:30:00Z"
  }
}
```

---

### 2. Get All To-Dos
**Endpoint:** `GET /api/todo`

**Description:** Get all to-do items

**Query Parameters:**
- `status` - Filter by status (pending, completed)

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "To-dos retrieved successfully",
  "data": {
    "todos": [
      {
        "_id": "todoId123",
        "title": "Prepare for interview",
        "status": "pending",
        "dueDate": "2024-05-10"
      }
    ]
  }
}
```

---

### 3. Update To-Do
**Endpoint:** `PUT /api/todo/:id`

**Description:** Update a to-do item

**Parameters:**
- `id` - To-do ID

**Request Body:**
```json
{
  "status": "completed"
}
```

---

### 4. Delete To-Do
**Endpoint:** `DELETE /api/todo/:id`

**Description:** Delete a to-do item

**Parameters:**
- `id` - To-do ID

---

## 📊 Analytics Endpoints

All analytics endpoints require authentication ✅

### 1. Get Analytics Dashboard
**Endpoint:** `GET /api/analytics`

**Description:** Get overall analytics statistics

**Query Parameters:**
- `period` - Time period (week, month, year)

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Analytics retrieved successfully",
  "data": {
    "totalApplications": 42,
    "interviews": 8,
    "offers": 2,
    "rejections": 5,
    "pending": 27,
    "responseRate": "38%",
    "platformStats": [
      {
        "platform": "LinkedIn",
        "count": 25,
        "responseRate": "40%"
      }
    ],
    "trends": {
      "byStatus": {...},
      "byPlatform": {...}
    }
  }
}
```

---

### 2. Get Platform-wise Statistics
**Endpoint:** `GET /api/analytics/platform`

**Description:** Get statistics grouped by platform

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Platform statistics retrieved",
  "data": {
    "platformStats": [
      {
        "platform": "LinkedIn",
        "applications": 25,
        "interviews": 4,
        "offers": 1
      }
    ]
  }
}
```

---

## 💬 Quote Endpoints

### 1. Get Daily Quote
**Endpoint:** `GET /api/quote`

**Description:** Get today's quote (no authentication required)

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Quote retrieved successfully",
  "data": {
    "quote": "Success is not final, failure is not fatal",
    "author": "Winston Churchill"
  }
}
```

---

## 📈 Report Endpoints

All report endpoints require authentication ✅

### 1. Generate Report
**Endpoint:** `POST /api/reports`

**Description:** Generate a custom report

**Request Body:**
```json
{
  "reportType": "applicationSummary",
  "startDate": "2024-01-01",
  "endDate": "2024-05-01",
  "platforms": ["LinkedIn", "Indeed"]
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Report generated successfully",
  "data": {
    "_id": "reportId123",
    "reportType": "applicationSummary",
    "data": {...}
  }
}
```

---

### 2. Get All Reports
**Endpoint:** `GET /api/reports`

**Description:** Get all generated reports

---

### 3. Get Report by ID
**Endpoint:** `GET /api/reports/:id`

**Description:** Get a specific report

**Parameters:**
- `id` - Report ID

---

### 4. Delete Report
**Endpoint:** `DELETE /api/reports/:id`

**Description:** Delete a report

**Parameters:**
- `id` - Report ID

---

## 📝 Cover Letter Endpoints

All cover letter endpoints require authentication ✅

### 1. Create Cover Letter
**Endpoint:** `POST /api/cover-letter`

**Description:** Create a new cover letter

**Request Body:**
```json
{
  "jobId": "jobId123",
  "title": "Cover Letter - Tech Corp",
  "content": "Dear Hiring Manager..."
}
```

---

### 2. Get All Cover Letters
**Endpoint:** `GET /api/cover-letter`

**Description:** Get all cover letters

---

### 3. Update Cover Letter
**Endpoint:** `PUT /api/cover-letter/:id`

**Description:** Update a cover letter

**Parameters:**
- `id` - Cover Letter ID

---

### 4. Delete Cover Letter
**Endpoint:** `DELETE /api/cover-letter/:id`

**Description:** Delete a cover letter

**Parameters:**
- `id` - Cover Letter ID

---

## 🌐 Platform Endpoints

All platform endpoints require authentication ✅

### 1. Get All Platforms
**Endpoint:** `GET /api/platforms`

**Description:** Get list of all job platforms

---

### 2. Add Platform
**Endpoint:** `POST /api/platforms`

**Description:** Add a new platform

**Request Body:**
```json
{
  "name": "LinkedIn",
  "url": "https://linkedin.com",
  "description": "Professional networking"
}
```

---

## ❌ Error Handling

### Common Error Codes

| Code | Message | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Authentication required |
| 403 | Forbidden | Access denied |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource already exists |
| 422 | Unprocessable Entity | Validation error |
| 500 | Internal Server Error | Server error |

### Error Response Format

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information"
}
```

---

## 🧪 Testing

### Using cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Create Job (with token)
curl -X POST http://localhost:5000/api/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "company": "Tech Corp",
    "position": "Developer"
  }'
```

### Using Postman

1. Import `Postman_Testing.json` into Postman
2. Set `{{BASE_URL}}` variable to `http://localhost:5000`
3. After login, the token will auto-populate in subsequent requests

---

## 📝 Notes

- All timestamps are in ISO 8601 format (UTC)
- File uploads are limited to 10MB
- Resumes must be in PDF format
- Pagination defaults: page=1, limit=10
- Rate limiting: 100 requests per 15 minutes per IP

---

## 🔗 Related Documentation

- [Main README](../README.md)
- [Backend Setup Guide](./README.md)

