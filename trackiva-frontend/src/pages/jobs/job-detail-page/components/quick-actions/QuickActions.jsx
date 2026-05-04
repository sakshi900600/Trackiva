import React, { useState } from "react";
import styles from "./QuickActions.module.css";

const QuickActions = ({ job }) => {
  const [copied, setCopied] = useState(false);

  const ACTIONS = [
    {
      id: "followup",
      label: "Follow Up",
      desc: "Draft a follow-up email",
      bg: "#dbeafe", color: "#1d4ed8",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      onClick: () => {
        const subject = encodeURIComponent(`Following up on ${job?.role || "my application"} at ${job?.company || ""}`);
        window.open(`mailto:?subject=${subject}`, "_blank");
      },
    },
    {
      id: "schedule",
      label: "Schedule Interview",
      desc: "Add to your calendar",
      bg: "#ede9fe", color: "#7c3aed",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          <line x1="12" y1="14" x2="12" y2="18"/><line x1="10" y1="16" x2="14" y2="16"/>
        </svg>
      ),
      onClick: () => {
        const title = encodeURIComponent(`Interview: ${job?.role || ""} at ${job?.company || ""}`);
        window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}`, "_blank");
      },
    },
    {
      id: "copy",
      label: copied ? "Copied!" : "Copy Job Link",
      desc: "Copy URL to clipboard",
      bg: "#d1fae5", color: "#059669",
      icon: copied ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
        </svg>
      ),
      onClick: () => {
        const url = job?.links?.jobUrl || window.location.href;
        navigator.clipboard?.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
    },
    {
      id: "withdraw",
      label: "Withdraw",
      desc: "Remove your application",
      bg: "#fef2f2", color: "#ef4444",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
      ),
      onClick: () => {},
    },
  ];

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.iconBox}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
        </div>
        <h3 className={styles.title}>Quick Actions</h3>
      </div>
      <div className={styles.actions}>
        {ACTIONS.map((a) => (
          <button key={a.id} className={styles.btn} onClick={a.onClick}>
            <div className={styles.btnIcon} style={{ background: a.bg, color: a.color }}>{a.icon}</div>
            <div className={styles.btnContent}>
              <span className={styles.btnLabel}>{a.label}</span>
              <span className={styles.btnDesc}>{a.desc}</span>
            </div>
            <svg className={styles.arrow} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;