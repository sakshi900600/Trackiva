import React from "react";
import styles from "./ResumeSection.module.css";

const ResumeSection = ({ resume }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Resume</h3>
      {resume ? (
        <div className={styles.fileBox}>
          <div className={styles.fileIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </div>
          <div className={styles.fileMeta}>
            <p className={styles.fileName}>{resume.name}</p>
            <p className={styles.fileDate}>Uploaded {resume.uploadedAt}</p>
          </div>
          <div className={styles.fileActions}>
            <button className={styles.viewBtn}>View</button>
            <button className={styles.replaceBtn}>Replace</button>
          </div>
        </div>
      ) : (
        <button className={styles.uploadBtn}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          Upload Resume
        </button>
      )}
    </div>
  );
};

export default ResumeSection;