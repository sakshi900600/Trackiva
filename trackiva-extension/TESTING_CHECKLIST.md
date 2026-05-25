# 🧪 Testing Checklist for Trackiva Extension

Use this checklist to systematically test all features of the extension.

---

## ✅ Pre-Testing Requirements

- [ ] Backend running on `http://localhost:5000`
- [ ] Extension installed in Chrome
- [ ] Valid test account credentials ready
- [ ] Chrome Developer Tools available (F12)
- [ ] Test jobs URLs bookmarked:
  - [ ] LinkedIn job: https://linkedin.com/jobs/search
  - [ ] Indeed job: https://indeed.com
  - [ ] Glassdoor job: https://glassdoor.com

---

## 🔐 Authentication Tests

### Test A1: Login with Valid Credentials
- [ ] Open extension
- [ ] See login form
- [ ] Enter valid email
- [ ] Enter valid password
- [ ] Click Login
- [ ] ✅ Login successful message appears
- [ ] ✅ Form section appears (not login section)
- [ ] ✅ No console errors (F12)

**Expected:** Login works, form visible, no errors

---

### Test A2: Login with Invalid Email
- [ ] Open extension
- [ ] Enter invalid email format (e.g., "notanemail")
- [ ] Enter any password
- [ ] Click Login
- [ ] ✅ Error message appears (not necessarily immediate validation)

**Expected:** Either validation error or login error from server

---

### Test A3: Login with Invalid Password
- [ ] Open extension after logout
- [ ] Enter valid email
- [ ] Enter wrong password
- [ ] Click Login
- [ ] ✅ Error message "Login failed" or similar
- [ ] ✅ Login form still visible

**Expected:** Error message, login form remains visible

---

### Test A4: Logout
- [ ] Login first
- [ ] Verify form section visible
- [ ] Click "Logout" button at bottom
- [ ] ✅ Logout success message appears
- [ ] ✅ Form section hidden
- [ ] ✅ Login form visible again

**Expected:** Successfully logs out, returns to login screen

---

### Test A5: Session Persistence
- [ ] Login to extension
- [ ] Close extension popup (click elsewhere)
- [ ] Reopen extension (click icon again)
- [ ] ✅ Still logged in (form visible, not login form)

**Expected:** Session persists after popup closes

---

## 📝 Form Field Tests

### Test F1: Fill Basic Fields
- [ ] Login first
- [ ] Fill Company: "Apple"
- [ ] Fill Role: "iOS Developer"
- [ ] Select Platform: "LinkedIn"
- [ ] ✅ All fields accept input
- [ ] ✅ No console errors

**Expected:** All fields work correctly

---

### Test F2: Fill Optional Fields
- [ ] Fill all optional fields:
  - [ ] Application Link: "https://example.com/job"
  - [ ] Location: "San Francisco, CA"
  - [ ] Expected Salary: "150000"
  - [ ] Confidence Score: "85"
  - [ ] Tags: "remote, startup, AI"
  - [ ] Status: "Interview"
  - [ ] Notes: "Great company, met with hiring manager"
- [ ] ✅ All fields accept input

**Expected:** All fields work, data persists in form

---

### Test F3: Platform Selection
- [ ] Click Platform dropdown
- [ ] ✅ See options: LinkedIn, Indeed, Glassdoor, Angel List, Wellfound, Company Website, Other
- [ ] Select each option
- [ ] ✅ Selection works for all

**Expected:** All platform options selectable

---

### Test F4: Status Selection
- [ ] Click Status dropdown
- [ ] ✅ See all options: Applied, Screening, Interview, Offer, Rejected
- [ ] Select each one
- [ ] ✅ All work correctly

**Expected:** All status options work

---

### Test F5: Numeric Field Validation
- [ ] Salary field: Try entering "abc"
- [ ] ✅ Only numbers allowed (browser validation)
- [ ] Confidence: Try entering "150"
- [ ] ✅ Limited to 0-100

**Expected:** Numeric fields validate input

---

## 💾 Job Saving Tests

### Test S1: Save with Minimum Fields
- [ ] Login
- [ ] Clear form first
- [ ] Fill ONLY required fields:
  - [ ] Company: "Google"
  - [ ] Role: "Software Engineer"
  - [ ] Platform: "LinkedIn"
- [ ] Leave all optional fields empty
- [ ] Click "💾 Save Job"
- [ ] ✅ Success message with job ID appears
- [ ] ✅ Form clears automatically

**Expected:** Job saves with minimum required fields

---

### Test S2: Save with All Fields
- [ ] Login
- [ ] Fill ALL fields with data
- [ ] Click "💾 Save Job"
- [ ] ✅ Success message appears with job ID
- [ ] Go to Trackiva dashboard
- [ ] ✅ Job appears with all data filled in correctly

**Expected:** All data persists to database

---

### Test S3: Missing Company Field
- [ ] Login
- [ ] Fill Role and Platform only
- [ ] Leave Company empty
- [ ] Click "💾 Save Job"
- [ ] ✅ Error message: "Please fill in all required fields"

**Expected:** Validation prevents save without Company

---

### Test S4: Missing Role Field
- [ ] Fill Company and Platform only
- [ ] Leave Role empty
- [ ] Click "💾 Save Job"
- [ ] ✅ Error message about missing fields

**Expected:** Validation prevents save without Role

---

### Test S5: Missing Platform Field
- [ ] Fill Company and Role only
- [ ] Select Platform as "Select Platform" (blank)
- [ ] Click "💾 Save Job"
- [ ] ✅ Error message about missing fields

**Expected:** Validation prevents save without Platform

---

### Test S6: Clear Form Button
- [ ] Fill form with data
- [ ] Click "Clear Form"
- [ ] ✅ All fields cleared
- [ ] Company: empty
- [ ] Role: empty
- [ ] Platform: "Select Platform"
- [ ] Status: "applied"
- [ ] Confidence: "50"
- [ ] All other fields: empty

**Expected:** Form completely reset to defaults

---

### Test S7: Duplicate Job Handling
- [ ] Save a job
- [ ] Try to save the exact same job again
- [ ] ✅ Should create a new job (duplicate jobs allowed)
- [ ] Check dashboard - should see both

**Expected:** System allows duplicate jobs (different instances)

---

## 🤖 Auto-Fill Tests

### Test AF1: LinkedIn Auto-Fill
- [ ] Go to a LinkedIn job posting page
  - [ ] Example: linkedin.com/jobs/view/[jobid]
- [ ] Click Trackiva extension
- [ ] ✅ Info message: "Job data auto-populated from page!"
- [ ] Check fields:
  - [ ] Role: Should have job title
  - [ ] Company: Should have company name
  - [ ] Location: Should have location
- [ ] ✅ Fields populated (at least some)

**Expected:** Data auto-fills from LinkedIn page

---

### Test AF2: Indeed Auto-Fill
- [ ] Go to an Indeed job posting
- [ ] Click Trackiva extension
- [ ] ✅ See auto-populated data message
- [ ] Check if data filled in

**Expected:** Auto-fill works for Indeed jobs

---

### Test AF3: Glassdoor Auto-Fill
- [ ] Go to Glassdoor job listing
- [ ] Click extension
- [ ] ✅ Check if fields auto-populate

**Expected:** Works or gracefully fails with manual entry option

---

### Test AF4: Non-Supported Site
- [ ] Go to a random website (not a job site)
- [ ] Click extension
- [ ] Form appears empty or mostly empty
- [ ] ✅ Platform URL fills with page URL
- [ ] ✅ Can still manually fill rest of form
- [ ] ✅ Can still save job

**Expected:** Manual entry works on any site

---

## 🎨 UI/UX Tests

### Test U1: Button States
- [ ] Verify Save Job button:
  - [ ] Normal state (blue)
  - [ ] Hover state (lighter)
  - [ ] Active/Click state (depressed)
  - [ ] Disabled state (dimmed when loading)
- [ ] ✅ All states work

**Expected:** Buttons show proper visual states

---

### Test U2: Loading Spinner
- [ ] Click Save Job with valid data
- [ ] ✅ Spinner appears immediately
- [ ] ✅ Save button disabled while loading
- [ ] ✅ Spinner disappears after response
- [ ] ✅ Save button enabled again

**Expected:** Loading indicator appears and disappears correctly

---

### Test U3: Success Message
- [ ] Save a job
- [ ] ✅ Success message shows: "✅ Job saved successfully! (ID: ...)"
- [ ] ✅ Message disappears after 5 seconds
- [ ] ✅ Can click another button while message visible

**Expected:** Success message appears and auto-dismisses

---

### Test U4: Error Message
- [ ] Try to save with missing fields
- [ ] ✅ Error message appears in red
- [ ] ✅ Message disappears after 5 seconds
- [ ] ✅ Error style distinct from success

**Expected:** Error messages styled clearly

---

### Test U5: Responsive Design
- [ ] Resize browser window
- [ ] ✅ Extension popup remains readable
- [ ] ✅ Form fields stack properly
- [ ] ✅ Buttons remain clickable
- [ ] ✅ No text overflow

**Expected:** UI works at different sizes

---

## 🔄 Integration Tests

### Test I1: End-to-End Flow
- [ ] Start: Closed extension
- [ ] Click extension icon
- [ ] See login form
- [ ] Login with credentials
- [ ] See job form
- [ ] Go to LinkedIn
- [ ] Come back to extension
- [ ] See auto-filled data
- [ ] Adjust some fields
- [ ] Click Save
- [ ] See success message
- [ ] Check dashboard in web app
- [ ] ✅ Job appears with correct data

**Expected:** Complete flow works seamlessly

---

### Test I2: Multiple Saves in One Session
- [ ] Login
- [ ] Save Job 1 (Google - SWE)
- [ ] ✅ Success message
- [ ] Form clears
- [ ] Fill in Job 2 (Meta - PM)
- [ ] Save Job 2
- [ ] ✅ Success message
- [ ] Go to dashboard
- [ ] ✅ Both jobs visible

**Expected:** Can save multiple jobs in one session

---

### Test I3: Different Platforms
- [ ] Save job from LinkedIn
- [ ] Save job from Indeed
- [ ] Save job from Glassdoor
- [ ] Check dashboard
- [ ] ✅ All jobs show correct platform

**Expected:** Platform field correctly distinguishes sources

---

## 🐛 Error Handling Tests

### Test E1: Network Error (Backend Down)
- [ ] Stop backend server
- [ ] Try to login
- [ ] ✅ Error message appears (connection refused or timeout)
- [ ] Restart backend
- [ ] Login works again

**Expected:** Graceful error when backend unavailable

---

### Test E2: Invalid Auth Token
- [ ] Open browser storage
- [ ] Manually corrupt the auth token
- [ ] Try to save job
- [ ] ✅ Error message appears (unauthorized)

**Expected:** System handles invalid tokens

---

### Test E3: Console Error Check
- [ ] Open DevTools (F12)
- [ ] Go to Console tab
- [ ] Go through all test scenarios above
- [ ] ✅ No red error messages
- [ ] ✅ Only warnings are acceptable

**Expected:** No unhandled errors in console

---

## 📱 Cross-Browser Tests (Optional)

### Test CB1: Firefox
- [ ] [ ] Install Firefox extension (if applicable)
- [ ] [ ] Test login
- [ ] [ ] Test save

### Test CB2: Edge
- [ ] [ ] Load in Edge (Chromium-based)
- [ ] [ ] Test basic flow

---

## 📊 Data Validation Tests

### Test D1: Special Characters in Company
- [ ] Company: "AT&T Inc. (formerly SBC)"
- [ ] ✅ Saves correctly
- [ ] Check dashboard: ✅ Displays correctly

**Expected:** Special characters preserved

---

### Test D2: Long Text in Notes
- [ ] Notes: "This is a very long note that spans multiple lines and contains lots of information about the job opportunity and company culture..."
- [ ] ✅ Saves completely
- [ ] Check dashboard: ✅ All text visible

**Expected:** Long text handled properly

---

### Test D3: Salary Field
- [ ] Expected Salary: "100000"
- [ ] ✅ Saves as number
- [ ] Check dashboard: ✅ Shows as number (not string)

**Expected:** Numeric field stores as number

---

### Test D4: Tags Parsing
- [ ] Tags: "remote, startup, AI, machine-learning"
- [ ] ✅ Saves as array of tags
- [ ] Check dashboard: ✅ Each tag visible separately

**Expected:** Tags parsed correctly

---

## ✨ Final Checklist

**Before marking as complete:**

- [ ] All 30+ tests passed
- [ ] No console errors
- [ ] No broken features
- [ ] All required fields validated
- [ ] All optional features work
- [ ] Auto-fill works on major platforms
- [ ] Data correctly saves to backend
- [ ] UI is responsive and polished
- [ ] Error messages are clear
- [ ] Loading states work

---

## 📝 Test Results Summary

| Category | Tests | Passed | Failed | Notes |
|----------|-------|--------|--------|-------|
| Authentication | 5 | [ ]/5 | | |
| Form Fields | 5 | [ ]/5 | | |
| Job Saving | 7 | [ ]/7 | | |
| Auto-Fill | 4 | [ ]/4 | | |
| UI/UX | 5 | [ ]/5 | | |
| Integration | 3 | [ ]/3 | | |
| Error Handling | 3 | [ ]/3 | | |
| Data Validation | 4 | [ ]/4 | | |

**Total: [ ] / 36 tests passed**

---

## 🎉 Ready for Production?

- [ ] All tests passed
- [ ] No critical bugs
- [ ] Performance acceptable
- [ ] Documentation complete
- [ ] Backend handles all data correctly
- [ ] CORS properly configured

✅ **Extension ready to ship!**

---

**Test Date:** ____________  
**Tester Name:** ____________  
**Notes:** ____________________________________________________________

---

For issues found, create tickets with:
- Test number (e.g., "S1")
- Steps to reproduce
- Expected vs actual result
- Console errors (if any)
- Screenshot if applicable
