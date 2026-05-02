import React from "react";
import styles from "./CardView.module.css";
import CardItem from "./CardItem";
import { useNavigate } from "react-router-dom";

const CardView = ({ data = [], loading = false }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className={styles.skeletonGrid}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className={styles.skeletonCard}>
            <div className={styles.skeletonAccent} />
            <div className={styles.skeletonHeader}>
              <div className={styles.skeletonAvatar} />
              <div className={styles.skeletonBadge} />
            </div>
            <div className={styles.skeletonLine} style={{ width: "65%", height: "16px" }} />
            <div className={styles.skeletonLine} style={{ width: "40%", height: "12px" }} />
            <div className={styles.skeletonLine} style={{ width: "80%", height: "11px" }} />
            <div className={styles.skeletonLine} style={{ width: "55%", height: "11px" }} />
          </div>
        ))}
      </div>
    );
  }


  return (
    <div className={styles.grid}>
      {data.map((job) => (
        <CardItem
          key={job._id}
          job={job}
          onClick={() => navigate(`/jobs/${job._id}`)}
        />
      ))}
    </div>
  );
};

export default CardView;