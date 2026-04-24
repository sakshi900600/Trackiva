import React from "react";
import styles from "./CardView.module.css";
import { useNavigate } from "react-router-dom";

const CardView = ({ data = [], loading = false }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className={styles.state}>
        Loading...
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className={styles.state}>
        No data available
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {data.map((job) => (
        <div
          key={job._id}
          className={styles.card}
          onClick={() => navigate(`/jobs/${job._id}`)}
        >
          {/* TOP */}
          <div className={styles.title}>
            {job.title}
          </div>

          <div className={styles.company}>
            {job.company}
          </div>

          {/* STATUS */}
          <div className={styles.meta}>
            <span className={`${styles.status} ${styles[job.status]}`}>
              {job.status}
            </span>

            <span className={styles.location}>
              {job.location}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardView;