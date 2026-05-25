# 🔐 CORS & Security Setup Guide

## Understanding CORS

**CORS** (Cross-Origin Resource Sharing) is a security feature that prevents websites from accessing your API without permission.

Since the Chrome extension runs in a different context, you need to explicitly allow it.

---

## 🔧 Fix CORS Issues

### Step 1: Get Your Extension ID

1. Open Chrome → `chrome://extensions/`
2. Find "Trackiva Job Saver"
3. Copy the ID (looks like: `abcdefghijklmnopqrstuvwxyz`)

### Step 2: Update Backend CORS Configuration

Edit your `trackiva-backend/src/app.js`:

**Find the CORS section:**
```javascript
import cors from 'cors';
```

**Update to include your extension:**
```javascript
const corsOptions = {
  origin: [
    'http://localhost:3000',        // Frontend (if running locally)
    'http://localhost:5173',        // Vite dev server
    'chrome-extension://abcdefghijklmnopqrstuvwxyz', // ← Your extension ID
    'chrome-extension://zyxwvutsrqponmlkjihgfedcba'  // If you have another
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
```

### Step 3: Restart Backend

```bash
# Stop the backend (Ctrl+C)
# Restart it
npm start
```

---

## 📝 Production Setup (For Deployment)

When deploying to production, use your actual domain:

```javascript
const corsOptions = {
  origin: [
    'https://trackiva.example.com',  // Your frontend domain
    'https://www.trackiva.example.com',
    // Chrome extensions can be deployed to Chrome Web Store
    // You'll get specific extension IDs from the store
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
```

---

## 🧪 Testing CORS Configuration

### Test 1: Basic Connection

Open your browser console (F12) and run:

```javascript
fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'test'
  })
})
.then(r => {
  console.log('Status:', r.status);
  console.log('Headers:', r.headers);
  return r.json();
})
.then(d => console.log('Success:', d))
.catch(e => console.error('CORS Error:', e));
```

**Expected:** Response with auth token (no CORS error)

### Test 2: From Extension Popup

1. Open extension popup
2. Press `F12` to open DevTools
3. Go to Console tab
4. Try to login
5. Check console for errors

---

## 🚨 Common CORS Errors & Fixes

### Error: "Access to XMLHttpRequest has been blocked by CORS policy"

**Cause:** Extension origin not in CORS whitelist

**Fix:** 
1. Get exact extension ID from `chrome://extensions/`
2. Add to CORS origins
3. Restart backend
4. Reload extension (F5 on extensions page)

### Error: "No 'Access-Control-Allow-Origin' header"

**Cause:** CORS middleware not applied before routes

**Fix:** Ensure this order in `app.js`:
```javascript
import cors from 'cors';

// 1. CORS must be early
app.use(cors(corsOptions));

// 2. Then other middleware
app.use(express.json());

// 3. Then routes
app.use('/api/auth', authRoutes);
```

### Error: "Credentials mode is 'include' but Access-Control-Allow-Credentials is missing"

**Cause:** `credentials: true` in extension but not in CORS config

**Fix:**
```javascript
const corsOptions = {
  origin: [...],
  credentials: true,  // ← Add this
  ...
};
```

---

## 🔐 Security Best Practices

### Development (Localhost)
```javascript
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'chrome-extension://YOUR_EXT_ID'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
```

### Production
```javascript
const corsOptions = {
  origin: [
    'https://trackiva.example.com',
    'https://www.trackiva.example.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 3600 // Cache preflight for 1 hour
};
```

### DO NOT USE:
```javascript
// ❌ NEVER allow all origins
app.use(cors());

// ❌ NEVER use wildcard with credentials
cors({ origin: '*', credentials: true })
```

---

## 🧩 Complete Example Setup

### Backend: `trackiva-backend/src/app.js`

```javascript
import express from 'express';
import cors from 'cors';
import authRoutes from './modules/auth/auth.routes.js';
import jobRoutes from './modules/jobs/job.routes.js';
// ... other imports

const app = express();

// CORS Configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'chrome-extension://YOUR_EXTENSION_ID_HERE'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

// Apply CORS middleware FIRST
app.use(cors(corsOptions));

// Then other middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Then routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
// ... other routes

export default app;
```

---

## 🔄 Reload After Changes

After updating CORS configuration:

1. **Restart backend:**
   ```bash
   Ctrl+C
   npm start
   ```

2. **Reload extension:**
   - Go to `chrome://extensions/`
   - Find "Trackiva Job Saver"
   - Click the refresh icon

3. **Clear browser cache:**
   - DevTools (F12) → Right-click refresh → "Empty cache and hard refresh"

---

## 📊 Verifying CORS is Working

Check network headers in Chrome DevTools:

1. Click extension icon
2. Press F12 → Network tab
3. Try to login
4. Click the request in network tab
5. Check **Response Headers** for:
   ```
   Access-Control-Allow-Origin: chrome-extension://...
   Access-Control-Allow-Credentials: true
   ```

If these headers are present, CORS is correctly configured! ✅

---

## 🆘 Still Having Issues?

1. **Verify extension ID is correct:**
   - `chrome://extensions/` → Copy exact ID
   - No extra spaces or characters

2. **Check backend logs:**
   - Restart with `npm start`
   - Watch console for errors
   - Should not show CORS-related errors

3. **Try different origins:**
   - Comment out some origins temporarily
   - Test with just `*` (development only!)
   - Gradually add back specific origins

4. **Clear everything:**
   - Uninstall extension: `chrome://extensions/` → Remove
   - Restart backend
   - Reload extension from folder
   - Clear browser cache

---

## 📞 Support

If CORS is still not working:
1. Check backend logs for errors
2. Verify extension ID in CORS config matches `chrome://extensions/`
3. Ensure backend middleware order is correct
4. Try accessing API from regular web page first to isolate issue

---

**Remember:** CORS errors are security features, not bugs! They prevent unauthorized access to your API.
