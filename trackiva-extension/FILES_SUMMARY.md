# 📦 Trackiva Extension - Files Summary

This document describes all files in the trackiva-extension project.

---

## 📋 Core Extension Files

### `manifest.json`
**Purpose:** Chrome extension configuration file (required)

**Key Settings:**
- `manifest_version: 3` - Uses Manifest V3 (latest)
- Defines permissions (storage, tabs, activeTab, scripting)
- Specifies popup.html as action interface
- Defines content scripts for job data extraction
- Lists supported websites (LinkedIn, Indeed, Glassdoor, etc.)
- Declares icons folder for extension icon

**You may need to modify:**
- `icons` paths if you add custom icons
- `host_permissions` to add more websites

---

### `popup.html`
**Purpose:** User interface for the extension popup

**Contains:**
- Login form (email/password)
- Job form with all fields
- Status messages and loading spinner
- Links to CSS and JavaScript files

**Sections:**
1. Header with branding
2. Login section (hidden after login)
3. Main form section (hidden before login)
4. Message display area
5. Loading spinner

**You may want to modify:**
- Form field labels
- Placeholder text
- Button text/styling

---

### `popup.js`
**Purpose:** Core logic for the popup interface

**Main Functions:**
- `handleLogin()` - Authenticates user
- `saveJob()` - Saves job to database
- `clearForm()` - Resets all form fields
- `extractAndFillJobData()` - Auto-fills from webpage
- `showMessage()` - Displays status messages

**Configuration:**
- `API_BASE_URL` - **Important:** Must match your backend URL

**Important:** Update `API_BASE_URL` on line 5 to match your backend:
```javascript
API_BASE_URL: 'http://localhost:5000/api'
```

---

### `popup.css`
**Purpose:** Styling for the popup interface

**Features:**
- Modern gradient design (purple/blue)
- Responsive layout
- Dark/light mode compatible
- Smooth animations and transitions
- Loading spinner animation
- Mobile-friendly

**Customization:**
- Change gradient colors in `.header` style
- Adjust form width (currently 500px)
- Modify button colors in `.btn-*` classes

---

### `content-script.js`
**Purpose:** Runs on webpages to extract job data

**Functions:**
- Detects current website/platform
- Extracts job data using platform-specific selectors
- Supports: LinkedIn, Indeed, Glassdoor, Wellfound, Angel List
- Injects visual badge on pages
- Listens for extraction requests from popup

**Extraction Methods:**
- `extractLinkedInData()` - LinkedIn job details
- `extractIndeedData()` - Indeed job details
- `extractGlassdoorData()` - Glassdoor job details
- `extractWellfoundData()` - Wellfound job details
- `extractGenericJobData()` - Fallback for unknown sites

**Note:** May need updates if job sites redesign their pages

---

### `background.js`
**Purpose:** Service worker for background tasks

**Functions:**
- Listens for messages from popup and content scripts
- Handles job saving requests
- Manages authentication tokens
- Logs events (optional)
- Context menu integration

**Key Capabilities:**
- Saves jobs on behalf of popup
- Manages auth tokens in secure storage
- Handles CORS from background context
- Creates context menu options

---

### `icons/` (Directory)
**Purpose:** Contains extension icons

**Files Needed:**
- `icon-16.png` - Small icon (16x16 pixels)
- `icon-48.png` - Medium icon (48x48 pixels)
- `icon-128.png` - Large icon (128x128 pixels)

**Currently:** Directory exists but icons are placeholder. You should add actual PNG files.

---

## 📚 Documentation Files

### `README.md` (Comprehensive)
**Purpose:** Complete user and developer documentation

**Sections:**
- Features overview
- What data is captured
- Installation instructions
- How to use the extension
- Testing guide with 10+ test scenarios
- Troubleshooting guide
- API reference
- Security notes
- Future enhancements

**Use this for:** Complete understanding of extension capabilities

---

### `QUICK_START.md` (Fast Setup)
**Purpose:** Get up and running in 5 minutes

**Sections:**
- 4-step setup process
- Testing checklist
- Common issues quick reference
- Backend connection test

**Use this for:** Fastest path to working extension

---

### `CORS_SETUP.md` (Backend Configuration)
**Purpose:** Detailed CORS configuration instructions

**Sections:**
- CORS explanation
- Step-by-step setup
- Production configuration
- Testing CORS
- Common CORS errors and fixes
- Security best practices

**Use this when:** You get CORS errors (very common)

---

### `TESTING_CHECKLIST.md` (QA Guide)
**Purpose:** Comprehensive testing checklist for all features

**Test Categories:**
- Authentication (5 tests)
- Form Fields (5 tests)
- Job Saving (7 tests)
- Auto-Fill (4 tests)
- UI/UX (5 tests)
- Integration (3 tests)
- Error Handling (3 tests)
- Data Validation (4 tests)

**Total:** 36+ test scenarios

**Use this for:** Systematic testing before going live

---

### `TROUBLESHOOTING.md` (Problem Solving)
**Purpose:** Comprehensive troubleshooting guide

**Sections:**
- Quick diagnosis flowchart
- 8 major problem categories
- 40+ specific issues with solutions
- DevTools debugging techniques
- Performance troubleshooting
- Complete reset procedure
- Quick reference table

**Use this when:** Something isn't working

---

### `.gitignore`
**Purpose:** Specifies files to exclude from Git

**Excludes:**
- System files (DS_Store, Thumbs.db)
- IDE files (VSCode, IntelliJ, Sublime)
- Dependencies (node_modules)
- Build files (dist, build)
- Logs and temp files
- Environment variables

---

## 🏗️ Project Structure

```
trackiva-extension/
├── manifest.json                 ← Chrome config [REQUIRED]
├── popup.html                   ← UI template
├── popup.js                     ← Main logic [UPDATE API URL]
├── popup.css                    ← Styling
├── content-script.js            ← Web page extraction
├── background.js                ← Service worker
├── icons/                       ← Icons folder [ADD PNG FILES]
├── README.md                    ← Full documentation
├── QUICK_START.md              ← 5-minute setup
├── CORS_SETUP.md               ← Backend config help
├── TESTING_CHECKLIST.md        ← QA guide
├── TROUBLESHOOTING.md          ← Problem solving
└── .gitignore                  ← Git configuration
```

---

## 🔑 Key File Relationships

```
User Action Flow:
  User clicks extension icon
          ↓
    popup.html loads
          ↓
    popup.js executes
          ↓
  Check if logged in (popup.js)
          ↓
  If not: Show login form
  If yes: Show job form
          ↓
  User enters data
          ↓
  User clicks Save
          ↓
  popup.js sends data to API
          ↓
  Backend saves job
          ↓
  Show success message

Auto-fill Flow:
  User on LinkedIn/Indeed/Glassdoor
          ↓
  Clicks extension icon
          ↓
  popup.js sends extraction request
          ↓
  content-script.js receives request
          ↓
  Extracts data from page (platform-specific)
          ↓
  Sends data back to popup
          ↓
  popup.js fills form fields
          ↓
  User sees auto-populated form
```

---

## 🔐 Security Considerations

**Files Handling Sensitive Data:**
- `popup.js` - Stores auth token in popup context
- `background.js` - Stores auth token in Chrome storage
- `content-script.js` - Doesn't store sensitive data

**Security Measures:**
- Tokens stored in Chrome's secure storage (not localStorage)
- HTTPS required for production
- CORS prevents unauthorized API access
- Content scripts run in isolated context
- No sensitive data logged to console

---

## 🛠️ Configuration Changes Needed

### Before Testing

**1. Update API URL (REQUIRED)**
   - File: `popup.js` line 5
   - Also: `background.js` line 71
   - Change: `http://localhost:5000/api`

**2. Handle CORS (If getting CORS errors)**
   - File: `trackiva-backend/src/app.js`
   - Add extension ID to CORS origins
   - See CORS_SETUP.md for details

**3. Add Icons (Optional but recommended)**
   - Create 3 PNG files in `icons/` folder:
     - `icon-16.png` (16x16)
     - `icon-48.png` (48x48)
     - `icon-128.png` (128x128)

---

## 📝 File Modification Guide

### Safe to Modify
- ✅ `popup.js` - Update API URL, add logging
- ✅ `popup.css` - Customize colors, fonts
- ✅ `popup.html` - Adjust field labels
- ✅ `content-script.js` - Update selectors for new site designs
- ✅ Documentation files - Update as needed

### Be Careful
- ⚠️ `manifest.json` - Required settings, test after changes
- ⚠️ `background.js` - Background logic, test thoroughly
- ⚠️ `content-script.js` - Selectors break easily

### Don't Touch
- ❌ `manifest.json` version structure
- ❌ `background.js` message listeners
- ❌ `content-script.js` message handling

---

## 🔄 Development Workflow

### 1. Make Changes
Edit any file as needed

### 2. Reload Extension
Go to `chrome://extensions/` → Click refresh on Trackiva

### 3. Test Changes
- Click extension icon
- Test the modified functionality
- Check DevTools console (F12) for errors

### 4. Verify
- Use TESTING_CHECKLIST.md
- Run relevant test scenarios
- Check browser console for errors

### 5. Commit Changes
```bash
git add .
git commit -m "Describe your changes"
```

---

## 📊 File Dependencies

```
manifest.json
  ↓
popup.html ←→ popup.js ←→ popup.css
              ↓
          background.js
              ↓
          content-script.js
              ↓
          (runs on webpages)

All files depend on:
  - manifest.json (configuration)
  - Chrome browser APIs
  - Backend API (http://localhost:5000)
```

---

## ⚡ Quick Reference

| Need to... | Edit this file | Line # |
|-----------|---|---|
| Change API URL | popup.js | 5, 71 |
| Modify form fields | popup.html | 30-90 |
| Change styling | popup.css | anywhere |
| Update platform detection | content-script.js | 50-80 |
| Add event logging | background.js | 1-50 |
| Fix CORS | backend/src/app.js | cors config |

---

## 🚀 Deployment Checklist

Before deploying extension:

- [ ] Update API_BASE_URL for production
- [ ] Add production domain to CORS
- [ ] Add proper icons to icons/ folder
- [ ] Update README with production URL
- [ ] Test all features thoroughly
- [ ] Run full TESTING_CHECKLIST.md
- [ ] No console errors
- [ ] No sensitive data in code
- [ ] HTTPS configured
- [ ] Update version in manifest.json

---

## 📞 File Issues & Solutions

**popup.js not running?**
- Check console (F12) for syntax errors
- Verify manifest.json lists popup.html correctly

**content-script.js not extracting data?**
- Check if page is on supported sites list (manifest.json)
- Verify selectors still work (website may have redesigned)
- Use DevTools Inspect to check element structure

**background.js giving errors?**
- Check manifest.json lists background.js correctly
- Verify message listeners are correct
- Check Chrome logs for service worker errors

**CSS not applying?**
- Hard refresh browser (Ctrl+Shift+R)
- Reload extension from chrome://extensions/
- Check for CSS syntax errors

---

**Version:** 1.0.0  
**Last Updated:** May 2026  
**Total Files:** 11 (6 core + 1 directory + 4 documentation)

---

For detailed information on each file, see respective documentation files above.
