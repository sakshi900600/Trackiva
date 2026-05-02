import React from "react";
import styles from "./PlatformCard.module.css";

const PLATFORM_ICONS = {
  LinkedIn: "in",
  Naukri: "N",
  Indeed: "I",
  Glassdoor: "G",
  AngelList: "A",
  Wellfound: "W",
  default: "🌐",
};

const PLATFORM_COLORS = {
  LinkedIn: ["#dbeafe", "#2563eb"],
  Naukri: ["#fff7ed", "#ea580c"],
  Indeed: ["#fef9c3", "#854d0e"],
  Glassdoor: ["#d1fae5", "#059669"],
  AngelList: ["#fce7f3", "#be185d"],
  Wellfound: ["#ede9fe", "#7c3aed"],
  default: ["#f1f5f9", "#475569"],
};

const PlatformCard = ({ platform }) => {
  const name = platform?.name || "Unknown";
  const [bg, color] = PLATFORM_COLORS[name] || PLATFORM_COLORS.default;
  const icon = PLATFORM_ICONS[name] || PLATFORM_ICONS.default;

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Platform</h3>
      <div className={styles.content}>
        <div className={styles.icon} style={{ background: bg, color }}>
          {icon}
        </div>
        <div>
          <p className={styles.name}>{name}</p>
          <p className={styles.type}>{platform?.type || "Job Board"}</p>
        </div>
      </div>
    </div>
  );
};

export default PlatformCard;