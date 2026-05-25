# 🚀 Quick Start Guide - Trackiva Extension

## 5-Minute Setup

### Step 1: Start Your Backend (2 minutes)
```bash
cd trackiva-backend
npm install  # Only needed if dependencies not installed
npm start
```

✅ Backend should be running on `http://localhost:5000`

### Step 2: Load Extension in Chrome (2 minutes)
1. Open Chrome → Type `chrome://extensions/` in address bar
2. Toggle **"Developer mode"** (top-right corner)
3. Click **"Load unpacked"**
4. Select the `trackiva-extension` folder
5. ✅ Extension installed! Icon should appear in toolbar

### Step 3: Configure API URL (1 minute)

Only needed if your backend runs on a different port:

**Edit `trackiva-extension/popup.js` line 5:**
```javascript
const CONFIG = {
  API_BASE_URL: 'http://localhost:5000/api', // ← Change if needed
  // ...
};
```

Also **edit `trackiva-extension/background.js` line 71** with the same URL.

### Step 4: Handle CORS (If needed)

If you see CORS errors, edit `trackiva-backend/src/app.js`:

```javascript
import cors from 'cors';

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'chrome-extension://YOUR_EXTENSION_ID' // Get from chrome://extensions/
  ],
  credentials: true
}));
```

---

## ✅ Testing Checklist

- [ ] Backend running on correct port
- [ ] Extension installed in Chrome
- [ ] Login works with test account
- [ ] Can save a job with minimum fields
- [ ] Auto-fill works on LinkedIn/Indeed
- [ ] Clear Form button resets all fields
- [ ] Logout works and returns to login screen

---

## 🎯 Test Credentials

Use any valid Trackiva account:
- Email: your registered email
- Password: your password

---

## 📝 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Extension not loading | Check chrome://extensions/ → Enable Developer mode |
| API errors | Verify backend running, check port in popup.js |
| CORS errors | Update backend cors config with extension ID |
| Auto-fill not working | Try on LinkedIn/Indeed, manual entry works on any site |
| Can't login | Verify backend auth endpoint works |

---

## 📂 File Structure

```
trackiva-extension/
├── manifest.json       ← Chrome config
├── popup.html         ← UI template
├── popup.js           ← Main logic & API calls
├── popup.css          ← Styling
├── content-script.js  ← Auto-extract job data
├── background.js      ← Background service worker
├── icons/             ← Extension icons (placeholder)
└── README.md          ← Full documentation
```

---

## 🔄 Workflow

1. **User clicks extension icon** → popup opens
2. **If not logged in** → Shows login form
3. **After login** → Shows job form
4. **User fills data** → Some fields auto-fill if on job site
5. **Click Save** → Job sent to backend API
6. **Backend creates job** → Response shows success + job ID
7. **Form clears** → Ready for next job

---

## 🧪 Quick Test

1. Click extension icon
2. Enter your Trackiva credentials
3. Go to any job site (LinkedIn, Indeed, etc.)
4. Click extension icon again
5. Fill form (should auto-populate if supported site)
6. Click "💾 Save Job"
7. ✅ Should see success message with job ID

---

## 🆘 Getting Help

**Extension not showing?**
- `chrome://extensions/` → Pin the extension
- Check if installed correctly

**Login fails?**
- Verify backend is running
- Check email/password are correct
- Check API_BASE_URL is correct

**Save job fails?**
- Check all required fields filled (Company, Role, Platform)
- Look for error message - it explains what went wrong
- Check backend console for API errors

**CORS errors?**
- Update backend CORS config with extension ID
- Don't forget to restart backend after changes

---

## 📞 Backend Connection Test

Open browser console while popup is open:

```javascript
// Test API connection
fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'test@example.com', password: 'test' })
})
.then(r => r.json())
.then(d => console.log('Response:', d))
.catch(e => console.error('Error:', e))
```

If this works, extension should work too.

---

## 🎉 You're Ready!

- Backend: ✅ Running
- Extension: ✅ Installed  
- API: ✅ Connected
- Ready to: **Save Jobs!** 🚀

---

For more details, see [README.md](./README.md)
