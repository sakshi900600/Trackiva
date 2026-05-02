import React, { useState } from "react";
import styles from "./QuickActions.module.css";

const ACTIONS = [
  {
    id: "followup",
    label: "Follow Up",
    description: "Send a follow-up email",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    color: "blue",
  },
  {
    id: "schedule",
    label: "Schedule Interview",
    description: "Set up a meeting",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
        <line x1="12" y1="14" x2="12" y2="18"/>
        <line x1="10" y1="16" x2="14" y2="16"/>
      </svg>
    ),
    color: "purple",
  },
  {
    id: "withdraw",
    label: "Withdraw Application",
    description: "Remove your application",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="15" y1="9" x2="9" y2="15"/>
        <line x1="9" y1="9" x2="15" y2="15"/>
      </svg>
    ),
    color: "red",
  },
  {
    id: "copy",
    label: "Copy Job Link",
    description: "Copy to clipboard",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
      </svg>
    ),
    color: "green",
  },
];

const QuickActions = ({ job }) => {
  const [copied, setCopied] = useState(false);

  const handleAction = (id) => {
    if (id === "copy") {
      const url = job?.links?.jobUrl || window.location.href;
      navigator.clipboard?.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Quick Actions</h3>
      <div className={styles.actions}>
        {ACTIONS.map((action) => (
          <button
            key={action.id}
            className={`${styles.btn} ${styles[action.color]}`}
            onClick={() => handleAction(action.id)}
          >
            <span className={styles.btnIcon}>{action.icon}</span>
            <div className={styles.btnContent}>
              <span className={styles.btnLabel}>
                {action.id === "copy" && copied ? "Copied!" : action.label}
              </span>
              <span className={styles.btnDesc}>{action.description}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;