import React from "react";
import styles from "./StatCard.module.css";

const StatCard = ({ title, value, changeText, icon: Icon, color }) => {
  const text = changeText?.trim() || "";

  const isPositive = text.startsWith("+");
  const isNegative = text.startsWith("-");

  return (
    <div className={styles.card}>
      
      {/* Top Row */}
      <div className={styles.topRow}>
        <h3 className={styles.title}>{title}</h3>

        <div className={`${styles.iconWrapper} ${styles[color]}`}>
          <Icon className={styles.icon} />
        </div>
      </div>

      {/* Value */}
      <div className={styles.value}>{value}</div>

      {/* Change Text */}
      <p
        className={`${styles.changeText} ${
          isPositive
            ? styles.positive
            : isNegative
            ? styles.negative
            : styles.neutral
        }`}
      >
        {changeText}
      </p>
    </div>
  );
};

export default StatCard;