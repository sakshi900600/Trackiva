# 📌 Trackiva Job Saver Chrome Extension

A powerful Chrome extension for **Trackiva** that lets you save job postings directly to your dashboard from any job board or website.

## 🌟 Features

- ✅ **Quick Job Saving** - Save jobs with a single click
- 🔐 **Secure Authentication** - Login with your Trackiva account
- 🤖 **Auto-Detection** - Automatically extracts job data from popular job boards
- 📱 **Smart Form** - Intuitive form with all relevant job fields
- 🏢 **Multi-Platform Support** - Works on LinkedIn, Indeed, Glassdoor, Angel List, Wellfound, and more
- 💾 **Full Data Support** - Captures company, title, location, salary, platform, and custom notes
- 🎨 **Beautiful UI** - Modern, responsive design with smooth animations
- 🔔 **Status Tracking** - Track application status (Applied, Screening, Interview, Offer, Rejected)
- 🏷️ **Tags & Notes** - Add tags and detailed notes for each job

## 📋 What Data is Captured

The extension captures the following job information:

### Required Fields
- **Company** - Company/Organization name
- **Job Title/Role** - Position title
- **Platform** - Where you found the job (LinkedIn, Indeed, etc.)

### Optional Fields
- **Application Link** - Direct link to job posting
- **Location** - Job location
- **Expected Salary** - Expected salary range
- **Confidence Score** - Your confidence level (0-100)
- **Tags** - Comma-separated tags (e.g., "remote, startup")
- **Status** - Current application status
- **Notes** - Additional notes about the job

## 🚀 Installation & Setup

### Step 1: Prepare Your Backend

Before installing the extension, ensure your Trackiva backend is running:

```bash
cd trackiva-backend
npm install
npm start
```

The backend should be running on `http://localhost:5000` (or update the API URL in the extension files).

### Step 2: Update API Configuration

Edit the API base URL in the extension files to match your backend:

**File: `popup.js`** (Line 5)
```javascript
const CONFIG = {
  API_BASE_URL: 'http://localhost:5000/api', // Update this URL
  // ...
};
```

**File: `background.js`** (Line 71)
```javascript
const apiUrl = 'http://localhost:5000/api'; // Update this URL
```

### Step 3: Install the Extension in Chrome

1. **Open Chrome** and go to: `chrome://extensions/`

2. **Enable Developer Mode** - Toggle the switch in the top-right corner

3. **Click "Load unpacked"** and select the `trackiva-extension` folder

4. **The extension is now installed!** You should see the Trackiva icon in your toolbar

### Step 4: Configure for CORS (Important for Development)

If you get CORS errors, you need to:

**Option A: Update your backend to allow CORS for localhost**

In your `trackiva-backend/src/app.js`, ensure CORS is properly configured:

```javascript
import cors from 'cors';

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'chrome-extension://YOUR_EXTENSION_ID'],
  credentials: true
}));
```

To find your extension ID:
1. Go to `chrome://extensions/`
2. Look for "Trackiva Job Saver" extension
3. Copy the ID shown below the name

**Option B: Use a CORS proxy (temporary solution)**

Install and use a CORS proxy for development only.

## 📖 How to Use

### Basic Workflow

1. **Login to Trackiva**
   - Click the Trackiva extension icon in your toolbar
   - Enter your Trackiva email and password
   - Click "Login"

2. **Save a Job**
   - Navigate to any job posting
   - Click the Trackiva extension icon
   - The form will auto-fill if possible
   - Fill in any missing details
   - Adjust status, confidence score, and add notes as needed
   - Click "💾 Save Job"

3. **View Saved Jobs**
   - Go to your Trackiva dashboard
   - All saved jobs will appear in your jobs list

### Auto-Fill Feature

The extension automatically detects and extracts job information from:

- **LinkedIn** - Job title, company, location
- **Indeed** - Job title, company, location
- **Glassdoor** - Job title, company, location
- **Wellfound** - Job details
- **Angel List** - Job details
- **Other sites** - Basic extraction from page content

Even if auto-fill doesn't work perfectly, you can manually edit any field.

### Logout

Click the "Logout" button at the bottom of the extension to securely sign out.

## 🧪 Testing Guide

### Test Scenario 1: Login/Logout

**Steps:**
1. Open extension
2. Enter valid Trackiva credentials
3. Click Login
4. Verify success message appears
5. Click Logout
6. Verify return to login screen

**Expected Result:** ✅ Login and logout work smoothly

### Test Scenario 2: Save Basic Job

**Steps:**
1. Login to extension
2. Fill in required fields:
   - Company: "Google"
   - Role: "Software Engineer"
   - Platform: "LinkedIn"
3. Click "💾 Save Job"

**Expected Result:** ✅ Success message with job ID, form clears, job appears in dashboard

### Test Scenario 3: Auto-Fill from LinkedIn

**Steps:**
1. Go to a LinkedIn job posting (e.g., linkedin.com/jobs/view/...)
2. Click Trackiva extension icon
3. Observe form fields

**Expected Result:** ✅ Company, Role, and Location auto-fill from the page

### Test Scenario 4: Auto-Fill from Indeed

**Steps:**
1. Go to an Indeed job posting (e.g., indeed.com/viewjob?jk=...)
2. Click Trackiva extension icon
3. Observe form fields

**Expected Result:** ✅ Company, Role, and Location auto-fill

### Test Scenario 5: Save with Optional Fields

**Steps:**
1. Fill all form fields including:
   - Expected Salary: 100000
   - Confidence Score: 85
   - Tags: "remote, startup"
   - Status: "Interview"
   - Notes: "Great company, interesting project"
2. Click "💾 Save Job"

**Expected Result:** ✅ Job saved with all data, visible in dashboard

### Test Scenario 6: Validation Testing

**Steps:**
1. Try to save without Company name
2. Try to save without Role
3. Try to save without Platform

**Expected Result:** ✅ Error message appears for missing required fields

### Test Scenario 7: Clear Form

**Steps:**
1. Fill in some job data
2. Click "Clear Form"

**Expected Result:** ✅ All fields are cleared and reset to defaults

### Test Scenario 8: Invalid Login

**Steps:**
1. Enter wrong email/password
2. Click Login

**Expected Result:** ✅ Error message appears, login form stays visible

### Test Scenario 9: Check Console Errors

**Steps:**
1. Right-click extension icon → "Manage Extension"
2. Click "Errors" to view any console errors
3. Test various features

**Expected Result:** ✅ No console errors (warnings are okay)

### Test Scenario 10: Multiple Jobs

**Steps:**
1. Save 3-5 different jobs
2. Go to dashboard and verify all appear

**Expected Result:** ✅ All jobs saved correctly with their data intact

## 🔧 Troubleshooting

### Issue: "Cannot POST /api/jobs"

**Solution:**
- Verify backend is running on correct port
- Check API_BASE_URL in popup.js and background.js
- Ensure backend route is `/api/jobs`

### Issue: CORS Error

**Solution:**
1. Update backend CORS configuration
2. Add extension ID to allowed origins:
   ```bash
   chrome://extensions/ → copy extension ID
   ```
3. Update backend cors config with your extension ID

### Issue: Auto-fill not working

**Solution:**
- This is normal on non-supported sites
- Manually fill in the form
- Content script might need updates for new site layouts

### Issue: Extension icon not showing

**Solution:**
1. Go to `chrome://extensions/`
2. Find "Trackiva Job Saver"
3. Click the pin icon to pin it to toolbar

### Issue: Not staying logged in

**Solution:**
- Check if localStorage is enabled
- Try logging in again
- Check browser storage settings

### Issue: "Backend not reachable" error

**Solution:**
1. Verify backend is running: `npm start` in backend folder
2. Check correct port (default 5000)
3. Update API_BASE_URL to match your backend

## 📁 Project Structure

```
trackiva-extension/
├── manifest.json          # Chrome extension configuration
├── popup.html            # Extension popup UI
├── popup.js              # Popup logic and API calls
├── popup.css             # Popup styling
├── content-script.js     # Job data extraction from web pages
├── background.js         # Service worker for background tasks
└── README.md             # This file
```

## 🔐 Security Notes

- ✅ Auth token stored securely in Chrome storage
- ✅ HTTPS recommended for production
- ✅ Tokens are never exposed in logs
- ✅ Content scripts run in isolated context
- ✅ No sensitive data stored in sync storage

## 📚 API Reference

### Create Job

**Endpoint:** `POST /api/jobs`

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "company": "Google",
  "role": "Software Engineer",
  "platform": "LinkedIn",
  "platformUrl": "https://linkedin.com/jobs/view/...",
  "location": "Mountain View, CA",
  "status": "applied",
  "confidenceScore": 85,
  "tags": ["remote", "startup"],
  "salary": {
    "expected": 150000
  },
  "notes": [
    {
      "id": "unique-id",
      "text": "Great opportunity"
    }
  ]
}
```

## 🚀 Future Enhancements

- [ ] Bulk import from saved jobs
- [ ] Custom field mappings per site
- [ ] Job recommendation AI
- [ ] Interview prep integration
- [ ] Desktop notifications
- [ ] Dark mode support
- [ ] Internationalization (i18n)

## 🐛 Reporting Issues

Found a bug? Please:
1. Check the troubleshooting section above
2. Review console errors (right-click → Inspect)
3. Test in a fresh browser profile
4. Report with:
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser version
   - Extension version

## 📄 License

Part of the Trackiva Project - All rights reserved

## 💡 Tips & Tricks

1. **Keyboard Shortcuts:**
   - Press Enter in email field to login
   - Press Tab to navigate form fields

2. **Form Shortcuts:**
   - Double-click "Clear Form" to confirm
   - Auto-fill will highlight with info message

3. **Data Management:**
   - Tags help with job organization
   - Confidence score indicates job fit
   - Notes are searchable in dashboard

4. **Best Practices:**
   - Update status as you progress
   - Add notes after interviews
   - Use consistent platform names
   - Tag by job type (Frontend, Backend, etc.)

## 📞 Support

For issues or questions:
1. Check this README
2. Review troubleshooting section
3. Check backend logs for API errors
4. Verify all URLs are correctly configured

---

**Version:** 1.0.0  
**Last Updated:** May 2026  
**Status:** Ready for Testing ✅
