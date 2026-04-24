import React from "react";
import styles from "./ResumeSection.module.css";

const ResumeSection = ({ resume }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Resume</h3>

      {resume ? (
        <div className={styles.fileBox}>
          <p className={styles.fileName}>{resume.name}</p>
          <p className={styles.meta}>
            Uploaded: {resume.uploadedAt}
          </p>

          <div className={styles.actions}>
            <button>View</button>
            <button>Replace</button>
          </div>
        </div>
      ) : (
        <button className={styles.uploadBtn}>Upload Resume</button>
      )}
    </div>
  );
};

export default ResumeSection;