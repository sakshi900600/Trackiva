// ===================================
// Trackiva Content Script
// ===================================

console.log("Trackiva content script loaded");

// ===================================
// Message Listener
// ===================================

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {

    if (request.action === "extractJobData") {

      const jobData = extractJobData();

      sendResponse({
        jobData
      });
    }
  }
);

// ===================================
// Extract Job Data
// ===================================

function extractJobData() {

  const hostname = window.location.hostname;

  let data = {
    company: "",
    role: "",
    location: "",
    platform: "",
    platformUrl: window.location.href
  };

  // LinkedIn
  if (hostname.includes("linkedin.com")) {

    data.platform = "LinkedIn";

    data.role =
      document.querySelector(
        ".job-details-jobs-unified-top-card__job-title"
      )?.innerText?.trim() || "";

    data.company =
      document.querySelector(
        ".job-details-jobs-unified-top-card__company-name"
      )?.innerText?.trim() || "";

    data.location =
      document.querySelector(
        ".job-details-jobs-unified-top-card__primary-description-container"
      )?.innerText?.trim() || "";
  }

  // Indeed
  else if (hostname.includes("indeed.com")) {

    data.platform = "Indeed";

    data.role =
      document.querySelector(
        'h1[data-testid="jobsearch-JobInfoHeader-title"]'
      )?.innerText?.trim() || "";

    data.company =
      document.querySelector(
        '[data-testid="inlineHeader-companyName"]'
      )?.innerText?.trim() || "";

    data.location =
      document.querySelector(
        '[data-testid="job-location"]'
      )?.innerText?.trim() || "";
  }

  // Glassdoor
  else if (hostname.includes("glassdoor.com")) {

    data.platform = "Glassdoor";

    data.role =
      document.querySelector(
        '[data-test="job-title"]'
      )?.innerText?.trim() || "";

    data.company =
      document.querySelector(
        '[data-test="employer-name"]'
      )?.innerText?.trim() || "";

    data.location =
      document.querySelector(
        '[data-test="location"]'
      )?.innerText?.trim() || "";
  }

  console.log("Extracted Job Data:", data);

  return data;
}

// ===================================
// Inject Badge
// ===================================

function injectBadge() {

  // Prevent duplicate badge
  if (
    document.getElementById(
      "trackiva-extension-badge"
    )
  ) {
    return;
  }

  const badge = document.createElement("div");

  badge.id = "trackiva-extension-badge";

  badge.innerText = "📌 Trackiva Ready";

  badge.style.position = "fixed";
  badge.style.top = "20px";
  badge.style.right = "20px";
  badge.style.zIndex = "999999";
  badge.style.padding = "10px 14px";
  badge.style.background =
    "linear-gradient(135deg,#667eea,#764ba2)";
  badge.style.color = "white";
  badge.style.borderRadius = "999px";
  badge.style.fontSize = "12px";
  badge.style.fontWeight = "600";
  badge.style.boxShadow =
    "0 4px 10px rgba(0,0,0,0.2)";
  badge.style.cursor = "pointer";

  document.body.appendChild(badge);
}

// ===================================
// Wait For LinkedIn Dynamic Content
// ===================================

window.addEventListener("load", () => {

  setTimeout(() => {

    injectBadge();

  }, 2500);
});