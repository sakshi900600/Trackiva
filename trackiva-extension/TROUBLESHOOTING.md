# 🔧 Troubleshooting Guide - Trackiva Extension

Comprehensive guide to solve common issues with the Trackiva extension.

---

## 🎯 Quick Diagnosis

Answer these questions to find your issue:

1. **Can you see the extension icon?** 
   - No → [Extension Installation Issues](#extension-installation-issues)
   - Yes → Continue

2. **Can you login?**
   - No → [Login Issues](#login-issues)
   - Yes → Continue

3. **Can you save jobs?**
   - No → [Job Saving Issues](#job-saving-issues)
   - Yes → Continue

4. **Are values auto-populating?**
   - No → [Auto-Fill Issues](#auto-fill-issues)
   - Yes → Extension works! 🎉

---

## 🚀 Extension Installation Issues

### Problem: Extension Icon Not Visible

**Symptoms:**
- No Trackiva icon in Chrome toolbar
- Extension doesn't appear in `chrome://extensions/`

**Solutions:**

#### Solution 1: Reload Extension
1. Open `chrome://extensions/`
2. Find "Trackiva Job Saver"
3. Click the refresh (circular) icon
4. Wait a few seconds

#### Solution 2: Pin to Toolbar
1. Go to `chrome://extensions/`
2. Find "Trackiva Job Saver"
3. Click the pin icon
4. Icon should now appear in toolbar

#### Solution 3: Reinstall Extension
1. Go to `chrome://extensions/`
2. Click "Remove" on Trackiva Job Saver
3. Click "Load unpacked"
4. Select `trackiva-extension` folder again
5. Verify it appears with ID shown

#### Solution 4: Check Developer Mode
1. Go to `chrome://extensions/`
2. Look for toggle in top-right corner
3. Toggle "Developer mode" ON if OFF
4. Try installing again

---

### Problem: "Extension Failed to Load"

**Symptoms:**
- Error message when loading unpacked
- Extension appears then disappears

**Causes & Solutions:**

**Check 1: Missing manifest.json**
```bash
# From trackiva-extension folder
ls manifest.json
# Should show: manifest.json
```
If missing, file may not be created properly. Try creating it again.

**Check 2: Invalid JSON in manifest.json**
1. Open `manifest.json`
2. Look for syntax errors (missing commas, quotes)
3. Use online JSON validator: `jsonlint.com`
4. Fix any errors
5. Reload extension

**Check 3: Incompatible Manifest Version**
- Ensure `"manifest_version": 3` is at top
- Not version 2 (deprecated)

---

## 🔐 Login Issues

### Problem: "Cannot POST /api/auth/login"

**Symptoms:**
- Error message when trying to login
- Spinner appears then error

**Causes:**

1. **Backend not running**
   ```bash
   # Check if backend is running
   curl http://localhost:5000/api/auth/login
   # Should give error, but not "connection refused"
   ```

   **Fix:**
   ```bash
   cd trackiva-backend
   npm start
   # Wait for "Server running on port 5000"
   ```

2. **Wrong API URL in extension**
   - Edit `popup.js` line 5
   - Update `API_BASE_URL` to match backend port
   - Reload extension

3. **Backend on different port**
   - If backend on 3001 instead of 5000:
   ```javascript
   const CONFIG = {
     API_BASE_URL: 'http://localhost:3001/api',
     // ...
   };
   ```

---

### Problem: "Login Failed" with Valid Credentials

**Symptoms:**
- Correct email and password
- Still shows "Login failed" error

**Solutions:**

#### Check 1: Account Exists
1. Login to Trackiva web dashboard
2. Verify email/password works there
3. If web login fails, account issue (not extension)

#### Check 2: Backend Auth Issues
1. Check backend console for errors
2. Look for "auth/login" route
3. Verify database connection works

#### Check 3: Inspect Request
1. Open DevTools (F12) in extension
2. Go to Console tab
3. Look for network errors
4. Check if request is being sent

---

### Problem: Login Works But "Still Logged Out"

**Symptoms:**
- Login succeeds (message shows)
- Click extension again → Login form reappears
- Token not persisting

**Solutions:**

#### Solution 1: Check Storage Permission
1. Go to `chrome://extensions/`
2. Find Trackiva extension
3. Click "Details"
4. Scroll down, verify "Storage" permission listed
5. If not listed, reinstall from manifest

#### Solution 2: Clear Storage & Try Again
```javascript
// In DevTools console (F12)
chrome.storage.local.clear(() => console.log('cleared'));
```
Then login again.

#### Solution 3: Check Browser Storage Settings
1. Settings → Privacy and security → Site settings
2. Ensure cookies/storage not blocked
3. Add exception for extension if needed

---

## 💾 Job Saving Issues

### Problem: "Error: Cannot save job" with No Details

**Symptoms:**
- Generic error message
- Form doesn't clear
- No job ID shown

**Diagnosis:**

**Check DevTools Console (F12):**
```javascript
// Errors should be logged here
// Look for red error messages
```

---

### Problem: CORS Error When Saving

**Symptoms:**
- Error: "Access to XMLHttpRequest blocked by CORS policy"
- Network tab shows 403 or 0 status code
- Backend receives no request

**Solution:**

This is a security issue. Backend needs to allow the extension.

#### Step 1: Get Extension ID
1. Go to `chrome://extensions/`
2. Find Trackiva extension
3. Copy the long ID below the name
4. Example: `abcdefghijklmnopqrstuvwxyzabcdefghijk`

#### Step 2: Update Backend CORS

Edit `trackiva-backend/src/app.js`:

**Find this section:**
```javascript
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  // ...
};
```

**Add extension ID:**
```javascript
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'chrome-extension://YOUR_EXTENSION_ID_HERE' // ← Add this
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
```

#### Step 3: Restart Backend
```bash
# Ctrl+C to stop
npm start
```

#### Step 4: Reload Extension
1. Go to `chrome://extensions/`
2. Click refresh icon on Trackiva
3. Try saving again

See [CORS_SETUP.md](./CORS_SETUP.md) for detailed CORS configuration.

---

### Problem: "401 Unauthorized" When Saving

**Symptoms:**
- Login works
- Try to save job
- Get "401 Unauthorized" error

**Causes:**
1. Token expired (rare in development)
2. Token corrupted in storage
3. Backend not recognizing token

**Solutions:**

#### Solution 1: Login Again
1. Click Logout
2. Login again
3. Try to save

#### Solution 2: Clear Storage
```javascript
// In DevTools Console
chrome.storage.local.clear(() => {
  console.log('Storage cleared, refresh extension');
});
```
Then close and reopen extension.

#### Solution 3: Check Token Format
1. Backend expects: `Authorization: Bearer TOKEN`
2. Check if backend sets token correctly
3. Verify token format in auth response

---

### Problem: Job Saves But Data Missing

**Symptoms:**
- Success message appears
- Job ID shown
- Go to dashboard
- Some fields missing or empty

**Diagnosis:**

Check what was sent vs what backend requires:

**In DevTools Console:**
```javascript
// Check what popup is sending
// Look for POST request to /api/jobs
// Check request body (should have company, role, platform)
```

**Possible causes:**
1. Field name mismatch (backend expects different name)
2. Data type mismatch (backend expects number, got string)
3. Required field not sent

**Solution:**
1. Compare popup.js (line ~200) with job model
2. Ensure field names match exactly
3. Verify data types match

---

### Problem: Validation Errors That Don't Make Sense

**Symptoms:**
- All fields filled
- Click Save
- Error: "missing required fields"
- But fields look filled

**Causes:**
1. Whitespace-only input (just spaces)
2. Form field not properly connected
3. JavaScript error preventing read

**Solution:**
```javascript
// In DevTools Console while extension open
console.log('Company:', document.getElementById('company').value.trim());
console.log('Role:', document.getElementById('role').value.trim());
console.log('Platform:', document.getElementById('platform').value.trim());
// All should show non-empty values
```

---

## 🤖 Auto-Fill Issues

### Problem: Auto-Fill Not Working on LinkedIn

**Symptoms:**
- On LinkedIn job page
- Click extension
- Fields remain empty
- No "auto-populated" message

**Solutions:**

#### Solution 1: Wait for Page Load
- LinkedIn pages load dynamically
- Wait 3-5 seconds for job details to load
- Then click extension

#### Solution 2: Refresh Page
1. Refresh the LinkedIn job page (F5)
2. Wait for it to fully load
3. Click extension again

#### Solution 3: Specific LinkedIn Page
- Auto-fill works on job detail pages:
  - ✅ `linkedin.com/jobs/view/[id]`
  - ✅ `linkedin.com/jobs/search?...`
  - ❌ LinkedIn feed pages might not work

#### Solution 4: Check Console for Errors
1. Right-click on page
2. Select "Inspect"
3. Go to Console tab
4. Look for red errors
5. If errors, selectors may need updating

**Note:** LinkedIn changes their page structure frequently. Selectors may need updates.

---

### Problem: Auto-Fill Extracting Wrong Data

**Symptoms:**
- Auto-fill works
- But data is incorrect
- Wrong company, wrong title, etc.

**Causes:**
- Page HTML structure differs from expected
- New LinkedIn/Indeed design changed selectors

**Temporary Solution:**
- Manually correct the fields
- Still saves correctly once fixed

**Permanent Solution:**
- Update content-script.js selectors
- Test with current page structure

---

### Problem: "Job data auto-populated" Message But Fields Empty

**Symptoms:**
- See info message
- But form fields still empty

**Cause:**
- Auto-extraction found no data to extract
- Fields returned empty strings

**Solution:**
- Manually fill the fields
- Fields will still save correctly

---

## 🎨 UI/Display Issues

### Problem: Extension Window Too Small or Text Cut Off

**Symptoms:**
- Popup window very small
- Text overlapping
- Buttons not fully visible

**Cause:**
- Browser zoom level or screen resolution
- CSS calculation issue

**Solutions:**

#### Solution 1: Adjust Zoom
- Windows: Ctrl + or Ctrl -
- Mac: Cmd + or Cmd -
- Reset: Ctrl+0 or Cmd+0

#### Solution 2: Check Screen Size
- Extension designed for 500px width minimum
- If monitor very small, may have issues
- Can't resize extension window

---

### Problem: Buttons Not Clickable

**Symptoms:**
- Button appears but doesn't respond
- Click does nothing

**Causes:**
1. Button disabled during loading
2. Overlay covering button
3. JavaScript error

**Solutions:**

#### Check 1: Wait for Loading
- If spinner showing, button is disabled
- Wait for response or error message
- Then try again

#### Check 2: Check DevTools Console
1. Press F12
2. Look for red errors
3. If errors, extension may be broken

#### Check 3: Reload Extension
1. Go to `chrome://extensions/`
2. Click refresh on Trackiva
3. Try again

---

### Problem: Form Freezes/Becomes Unresponsive

**Symptoms:**
- Can't type in fields
- Buttons don't work
- Spinner stuck spinning

**Cause:**
- Usually network request hanging

**Solutions:**

#### Solution 1: Wait Longer
- Backend might be slow
- Wait 10+ seconds
- Check if request completes

#### Solution 2: Close & Reopen Extension
1. Click elsewhere to close popup
2. Click extension icon again
3. Try again

#### Solution 3: Refresh Extension
1. Go to `chrome://extensions/`
2. Click refresh icon
3. Close and reopen popup

---

## 🔍 DevTools Debugging

### Enable Debug Logging

**In popup.js**, add at top:
```javascript
const DEBUG = true;

function log(message, data) {
  if (DEBUG) {
    console.log(`[TRACKIVA] ${message}`, data || '');
  }
}
```

Then use:
```javascript
log('Saving job', jobData);
log('Response:', result);
```

### Check Network Requests

1. Open extension
2. Press F12
3. Click "Network" tab
4. Perform action (login, save, etc.)
5. Look for requests to `localhost:5000`
6. Click request to see details:
   - **Headers**: Check Authorization header
   - **Request**: Check data being sent
   - **Response**: Check backend response
   - **Status**: Should be 200 (success) or 4xx/5xx (errors)

### Check Console Errors

1. Press F12 in extension popup
2. Go to "Console" tab
3. Perform actions that fail
4. Red messages = errors
5. Blue messages = info/warnings

Common errors to look for:
- `TypeError: Cannot read property...`
- `ReferenceError: X is not defined`
- `SyntaxError: Unexpected token`

---

## 📊 Performance Issues

### Problem: Extension Slow to Load

**Symptoms:**
- Long delay when clicking icon
- Spinner visible for 5+ seconds

**Causes:**
1. Backend slow to respond
2. Large payload processing
3. Browser resources low

**Solutions:**
1. Restart backend
2. Close other tabs/extensions
3. Check backend logs for errors
4. Verify network connection

---

### Problem: Saving Takes Very Long

**Symptoms:**
- Click Save
- Spinner spins for 20+ seconds
- Finally saves or times out

**Causes:**
1. Backend processing slowly
2. Database saving slowly
3. Network latency

**Solutions:**
1. Check backend logs
2. Verify database connection
3. Check network (no throttling)
4. Consider timeout increase

---

## 🔄 Data Issues

### Problem: Saved Data Doesn't Match What Was Entered

**Symptoms:**
- Enter "Senior Engineer"
- Dashboard shows "Engineer"
- Text truncated or modified

**Causes:**
1. Form validation/sanitization
2. Database field size limit
3. HTML encoding issue

**Solutions:**
1. Check backend model field sizes
2. Check validation rules
3. Verify special characters handled

### Problem: Duplicate Jobs Being Created

**Symptoms:**
- Save once
- See job duplicated 2-3 times in dashboard

**Causes:**
1. Multiple clicks on Save button
2. Request sent twice
3. Async issue

**Solutions:**
1. Disable Save button after click (already done)
2. Wait for success message before clicking again
3. Check if duplicate attempts actually saved (might be UI bug)

---

## 🆘 When All Else Fails

### Complete Reset Procedure

If nothing works, do a complete reset:

```bash
# 1. Remove extension
# - Go to chrome://extensions/
# - Click Remove on Trackiva Job Saver

# 2. Clear all extension data
# - Chrome menu → More tools → Clear browsing data
# - Select "All time"
# - Check "Cookies and cached images"
# - Clear

# 3. Restart Chrome completely
# - Close all Chrome windows
# - Wait 30 seconds
# - Reopen Chrome

# 4. Reload extension
# - chrome://extensions/
# - Click "Load unpacked"
# - Select trackiva-extension folder

# 5. Test
# - Click extension
# - Should show fresh login form
# - Try to login and save
```

---

### Collect Debug Info

If issue persists, collect this info:

```
Chrome Version: [chrome://version]
Extension Version: [chrome://extensions - ID and version]
Backend: [npm start output, any errors]
Error Messages: [exact text from popup]
Console Errors: [exact red text from F12 console]
Network Errors: [status codes from Network tab]
Steps to Reproduce: [1, 2, 3...]
```

---

## 📞 Getting Help

**Before asking for help, check:**
1. ✅ Backend running
2. ✅ Extension installed correctly
3. ✅ CORS configured
4. ✅ Followed all troubleshooting steps above
5. ✅ Tried complete reset
6. ✅ Checked console for errors

**When asking for help, include:**
- Chrome version
- Backend version
- Exact error message
- Steps to reproduce
- Console error (if any)

---

## ✨ Common Issues Quick Reference

| Issue | Solution |
|-------|----------|
| Icon not visible | Pin to toolbar or reload extension |
| Login fails | Verify backend running, check credentials |
| CORS error | Add extension ID to backend CORS config |
| Auto-fill empty | Wait for page load, try LinkedIn job detail page |
| Save fails | Check all required fields filled |
| Token not persisting | Clear storage, login again |
| Button unresponsive | Wait for spinner, reload extension |
| Data missing | Check backend received all fields |

---

**Still stuck?** Review [README.md](./README.md) or check backend logs for API errors.

---

*Last Updated: May 2026*  
*Extension Version: 1.0.0*
