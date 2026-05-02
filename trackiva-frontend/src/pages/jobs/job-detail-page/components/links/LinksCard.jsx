import React from "react";
import styles from "./LinksCard.module.css";

const LINK_CONFIG = [
  { key: "jobUrl", label: "Job Posting", icon: "📋" },
  { key: "applicationUrl", label: "Application", icon: "📝" },
  { key: "companySite", label: "Company Site", icon: "🏢" },
  { key: "recruiterProfile", label: "Recruiter", icon: "👤" },
];

const LinksCard = ({ links }) => {
  const hasLinks = links && Object.values(links).some(Boolean);

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Links</h3>
      {!hasLinks ? (
        <p className={styles.empty}>No links added</p>
      ) : (
        <div className={styles.list}>
          {LINK_CONFIG.map(({ key, label, icon }) =>
            links[key] ? (
              <a
                key={key}
                href={links[key]}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                <span className={styles.linkIcon}>{icon}</span>
                <span className={styles.linkLabel}>{label}</span>
                <span className={styles.linkUrl}>{links[key].replace(/^https?:\/\//, "").split("/")[0]}</span>
                <svg className={styles.external} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

export default LinksCard;