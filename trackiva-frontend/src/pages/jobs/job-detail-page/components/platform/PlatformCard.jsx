import React from "react";
import styles from "./PlatformCard.module.css";

const PlatformCard = ({ platform }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Platform</h3>

      <div className={styles.content}>
        <div className={styles.icon}>🌐</div>

        <div>
          <p className={styles.name}>{platform.name}</p>
          <p className={styles.type}>{platform.type}</p>
        </div>
      </div>
    </div>
  );
};

export default PlatformCard;