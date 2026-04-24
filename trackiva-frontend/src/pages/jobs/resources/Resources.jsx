import React from "react";
import styles from "./Resources.module.css";
import { useNavigate } from "react-router-dom";

const Resources = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <button
        className={`${styles.btn} ${styles.interview}`}
        onClick={() => navigate("/jobs/interview-prep")}
      >
        Interview Preparation
      </button>

      <button
        className={`${styles.btn} ${styles.resume}`}
        onClick={() => navigate("/jobs/resumes")}
      >
        Resumes
      </button>

      <button
        className={`${styles.btn} ${styles.cover}`}
        onClick={() => navigate("/jobs/cover-letters")}
      >
        Cover Letters
      </button>
    </div>
  );
};

export default Resources;