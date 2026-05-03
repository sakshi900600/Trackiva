import React from "react";
import styles from "./PlatformCard.module.css";

const PlatformCard = ({ platform }) => {
  const name =
    typeof platform === "string"
      ? platform
      : platform?.name || "Unknown";

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Platform</h3>
      <p>{name}</p>
    </div>
  );
};

export default PlatformCard;