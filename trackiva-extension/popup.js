// Configuration
const CONFIG = {
  API_BASE_URL: 'http://localhost:5000/api', // Change this to your backend URL
  STORAGE_KEY: 'trackiva_auth_token',
  USER_STORAGE_KEY: 'trackiva_user_data'
};

// DOM Elements
const elements = {
  loginSection: document.getElementById('loginSection'),
  mainSection: document.getElementById('mainSection'),
  email: document.getElementById('email'),
  password: document.getElementById('password'),
  loginBtn: document.getElementById('loginBtn'),
  logoutBtn: document.getElementById('logoutBtn'),
  
  company: document.getElementById('company'),
  role: document.getElementById('role'),
  platform: document.getElementById('platform'),
  platformUrl: document.getElementById('platformUrl'),
  location: document.getElementById('location'),
  expectedSalary: document.getElementById('expectedSalary'),
  confidenceScore: document.getElementById('confidenceScore'),
  tags: document.getElementById('tags'),
  status: document.getElementById('status'),
  notes: document.getElementById('notes'),
  
  saveBtn: document.getElementById('saveBtn'),
  clearBtn: document.getElementById('clearBtn'),
  message: document.getElementById('message'),
  spinner: document.getElementById('loadingSpinner')
};

// Initialize Extension
document.addEventListener('DOMContentLoaded', async () => {
  const token = await getStoredToken();
  
  if (token) {
    showMainSection();
    // Try to extract job data from current tab
    extractAndFillJobData();
  } else {
    showLoginSection();
  }
});

// ============ Authentication ============

async function getStoredToken() {
  return new Promise((resolve) => {
    chrome.storage.local.get([CONFIG.STORAGE_KEY], (result) => {
      resolve(result[CONFIG.STORAGE_KEY]);
    });
  });
}

async function storeToken(token) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [CONFIG.STORAGE_KEY]: token }, resolve);
  });
}

async function removeToken() {
  return new Promise((resolve) => {
    chrome.storage.local.remove([CONFIG.STORAGE_KEY], resolve);
  });
}

function showLoginSection() {
  elements.loginSection.classList.remove('hidden');
  elements.mainSection.classList.add('hidden');
}

function showMainSection() {
  elements.loginSection.classList.add('hidden');
  elements.mainSection.classList.remove('hidden');
}

elements.loginBtn.addEventListener('click', handleLogin);
elements.email.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleLogin();
});
elements.password.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleLogin();
});

async function handleLogin() {
  const email = elements.email.value.trim();
  const password = elements.password.value.trim();

  if (!email || !password) {
    showMessage('Please enter email and password', 'error');
    return;
  }

  showSpinner(true);
  try {
    const response = await fetch(`${CONFIG.API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Store token
    await storeToken(data.data.token);
    
    // Clear login form
    elements.email.value = '';
    elements.password.value = '';

    showMainSection();
    showMessage('Logged in successfully!', 'success');
    
    // Try to extract job data
    extractAndFillJobData();
  } catch (error) {
    showMessage(`Login failed: ${error.message}`, 'error');
  } finally {
    showSpinner(false);
  }
}

elements.logoutBtn.addEventListener('click', async () => {
  await removeToken();
  clearForm();
  showLoginSection();
  showMessage('Logged out successfully', 'success');
});

// ============ Job Saving ============

elements.saveBtn.addEventListener('click', saveJob);
elements.clearBtn.addEventListener('click', clearForm);

async function saveJob() {
  // Validate required fields
  const company = elements.company.value.trim();
  const role = elements.role.value.trim();
  const platform = elements.platform.value.trim();

  if (!company || !role || !platform) {
    showMessage('Please fill in all required fields (Company, Role, Platform)', 'error');
    return;
  }

  showSpinner(true);
  try {
    const jobData = {
      company,
      role,
      platform,
      platformUrl: elements.platformUrl.value.trim(),
      location: elements.location.value.trim(),
      status: elements.status.value,
      confidenceScore: parseInt(elements.confidenceScore.value) || 50,
      tags: elements.tags.value
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag),
      salary: {
        expected: parseInt(elements.expectedSalary.value) || 0
      }
    };

    // Add notes if any
    if (elements.notes.value.trim()) {
      jobData.notes = [{
        id: Date.now().toString(),
        text: elements.notes.value.trim(),
        createdAt: new Date().toISOString()
      }];
    }

    const token = await getStoredToken();
    const response = await fetch(`${CONFIG.API_BASE_URL}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(jobData)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to save job');
    }

    showMessage(`✅ Job saved successfully! (ID: ${result.data._id})`, 'success');
    
    // Clear form after successful save
    setTimeout(() => {
      clearForm();
    }, 1500);
  } catch (error) {
    showMessage(`Error: ${error.message}`, 'error');
  } finally {
    showSpinner(false);
  }
}

function clearForm() {
  elements.company.value = '';
  elements.role.value = '';
  elements.platform.value = '';
  elements.platformUrl.value = '';
  elements.location.value = '';
  elements.expectedSalary.value = '';
  elements.confidenceScore.value = '50';
  elements.tags.value = '';
  elements.status.value = 'applied';
  elements.notes.value = '';
}

// ============ Job Data Extraction ============

async function extractAndFillJobData() {
  try {
    // Get current tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Send message to content script to extract data
    chrome.tabs.sendMessage(tab.id, { action: 'extractJobData' }, (response) => {
      if (response && response.jobData) {
        fillFormWithJobData(response.jobData);
      }
    });
  } catch (error) {
    // Silently fail - user can manually enter data
    console.log('Could not auto-extract job data');
  }
}

function fillFormWithJobData(jobData) {
  if (jobData.company) elements.company.value = jobData.company;
  if (jobData.role) elements.role.value = jobData.role;
  if (jobData.platform) elements.platform.value = jobData.platform;
  if (jobData.platformUrl) elements.platformUrl.value = jobData.platformUrl;
  if (jobData.location) elements.location.value = jobData.location;
  
  showMessage('Job data auto-populated from page!', 'info');
}

// ============ Utilities ============

function showMessage(message, type = 'info') {
  elements.message.textContent = message;
  elements.message.className = `message ${type}`;
  elements.message.classList.remove('hidden');

  // Auto-hide after 5 seconds
  setTimeout(() => {
    elements.message.classList.add('hidden');
  }, 5000);
}

function showSpinner(show) {
  if (show) {
    elements.spinner.classList.remove('hidden');
    elements.saveBtn.disabled = true;
  } else {
    elements.spinner.classList.add('hidden');
    elements.saveBtn.disabled = false;
  }
}
