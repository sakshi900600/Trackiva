import React from "react";
import styles from "./JobInfo.module.css";

const JobInfo = ({ job }) => {
  const formatDate = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Job Details</h3>

      <div className={styles.grid}>
        <div className={styles.item}>
          <p className={styles.label}>Location</p>
          <p className={styles.value}>{job.location || "—"}</p>
        </div>

        <div className={styles.item}>
          <p className={styles.label}>Salary</p>
          <p className={styles.value}>
            {job.salary?.expected
              ? `₹${job.salary.expected.toLocaleString()}`
              : "—"}
          </p>
        </div>

        <div className={styles.item}>
          <p className={styles.label}>Applied Date</p>
          <p className={styles.value}>{formatDate(job.appliedDate)}</p>
        </div>

        <div className={styles.item}>
          <p className={styles.label}>Last Updated</p>
          <p className={styles.value}>{formatDate(job.updatedAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default JobInfo;