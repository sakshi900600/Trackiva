import React from "react";
import styles from "./PlatformCard.module.css";

const PLATFORM_COLORS = {
  linkedin: ["#dbeafe", "#1d4ed8"],
  naukri: ["#fef3c7", "#d97706"],
  indeed: ["#d1fae5", "#059669"],
  glassdoor: ["#d1fae5", "#16a34a"],
  internshala: ["#ede9fe", "#7c3aed"],
  wellfound: ["#fce7f3", "#db2777"],
  unstop: ["#ffedd5", "#ea580c"],
};

const getPlatformStyle = (name) => {
  const key = name?.toLowerCase().replace(/\s+/g, "");
  return PLATFORM_COLORS[key] || ["#f1f5f9", "#475569"];
};

const PlatformCard = ({ platform, platformUrl }) => {
  const name = typeof platform === "string" ? platform : platform?.name || "Unknown";
  const [bg, color] = getPlatformStyle(name);
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className={styles.card}>
      <div className={styles.headerRow}>
        <h3 className={styles.title}>Platform</h3>
        {platformUrl && (
          <a href={platformUrl} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Open
          </a>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.icon} style={{ background: bg, color }}>{initial}</div>
        <div>
          <p className={styles.name}>{name}</p>
          {platformUrl ? (
            <a href={platformUrl} target="_blank" rel="noopener noreferrer" className={styles.urlText}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
              </svg>
              {platformUrl.replace(/^https?:\/\//, "").split("/")[0]}
            </a>
          ) : (
            <p className={styles.type}>Job Platform</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlatformCard;