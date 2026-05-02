import React from "react";
import styles from "./JobInfo.module.css";

const INFO_ITEMS = [
  {
    key: "location",
    label: "Location",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21c0 0-7-6.75-7-11a7 7 0 1114 0c0 4.25-7 11-7 11z"/>
        <circle cx="12" cy="10" r="2.5"/>
      </svg>
    ),
    color: "blue",
  },
  {
    key: "salary",
    label: "Salary Range",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
    color: "green",
  },
  {
    key: "appliedDate",
    label: "Applied Date",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    color: "purple",
  },
  {
    key: "lastUpdated",
    label: "Last Updated",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
      </svg>
    ),
    color: "orange",
  },
];

const JobInfo = ({ jobInfo }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Job Details</h3>

      <div className={styles.grid}>
        {INFO_ITEMS.map(({ key, label, icon, color }) => (
          <div key={key} className={styles.item}>
            <div className={`${styles.iconBox} ${styles[color]}`}>
              {icon}
            </div>
            <div>
              <p className={styles.label}>{label}</p>
              <p className={styles.value}>{jobInfo[key] || "—"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobInfo;