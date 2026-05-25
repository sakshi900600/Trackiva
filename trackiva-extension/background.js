// ================================
// Trackiva Background Service Worker
// ================================

console.log("Trackiva background service worker started");

// Extension Installed
chrome.runtime.onInstalled.addListener((details) => {

  console.log("Extension installed", details);

  // Create context menu safely
  if (chrome.contextMenus) {

    chrome.contextMenus.create({
      id: "saveJobContextMenu",
      title: "💾 Save Job to Trackiva",
      contexts: ["page"]
    });
  }

  // Create cleanup alarm safely
  if (chrome.alarms) {

    chrome.alarms.create("cleanupOldData", {
      periodInMinutes: 60 * 24 * 7
    });
  }
});

// ================================
// Message Listener
// ================================

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  // Check Authentication
  if (request.action === "checkAuth") {

    chrome.storage.local.get(
      ["trackiva_auth_token"],
      (result) => {

        sendResponse({
          isAuthenticated: !!result.trackiva_auth_token
        });
      }
    );

    return true;
  }

  // Get Token
  if (request.action === "getAuthToken") {

    chrome.storage.local.get(
      ["trackiva_auth_token"],
      (result) => {

        sendResponse({
          token: result.trackiva_auth_token || null
        });
      }
    );

    return true;
  }

  // Save Job
  if (request.action === "saveJob") {

    saveJob(request.jobData)
      .then((data) => {

        sendResponse({
          success: true,
          data
        });
      })
      .catch((error) => {

        sendResponse({
          success: false,
          error: error.message
        });
      });

    return true;
  }
});

// ================================
// Save Job Function
// ================================

async function saveJob(jobData) {

  return new Promise((resolve, reject) => {

    chrome.storage.local.get(
      ["trackiva_auth_token"],
      async (result) => {

        try {

          const token = result.trackiva_auth_token;

          if (!token) {
            reject(new Error("User not authenticated"));
            return;
          }

          const response = await fetch(
            "http://localhost:5000/api/jobs",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              },
              body: JSON.stringify(jobData)
            }
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Failed to save job");
          }

          resolve(data);

        } catch (error) {

          reject(error);
        }
      }
    );
  });
}

// ================================
// Context Menu Click
// ================================

if (chrome.contextMenus) {

  chrome.contextMenus.onClicked.addListener((info, tab) => {

    if (info.menuItemId === "saveJobContextMenu") {

      chrome.action.openPopup();
    }
  });
}

// ================================
// Cleanup Alarm
// ================================

if (chrome.alarms) {

  chrome.alarms.onAlarm.addListener((alarm) => {

    if (alarm.name === "cleanupOldData") {

      cleanupOldEvents();
    }
  });
}

// ================================
// Cleanup Function
// ================================

function cleanupOldEvents() {

  const sevenDaysAgo = new Date();

  sevenDaysAgo.setDate(
    sevenDaysAgo.getDate() - 7
  );

  chrome.storage.local.get(
    ["trackiva_events"],
    (result) => {

      const events = result.trackiva_events || [];

      const filteredEvents = events.filter((event) => {

        return (
          new Date(event.timestamp) > sevenDaysAgo
        );
      });

      chrome.storage.local.set({
        trackiva_events: filteredEvents
      });
    }
  );
}