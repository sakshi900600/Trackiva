import React from "react";
import styles from "./StatusHistory.module.css";

const STATUS_COLOR = {
  applied: "#6366f1",
  screening: "#f59e0b",
  interview: "#3b82f6",
  offer: "#10b981",
  rejected: "#ef4444",
};

const STATUS_BG = {
  applied: "#eef2ff",
  screening: "#fef3c7",
  interview: "#eff6ff",
  offer: "#ecfdf5",
  rejected: "#fef2f2",
};

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
};

const StatusHistory = ({ history }) => {
  if (!history || history.length === 0) return null;

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Status Timeline</h3>
      <div className={styles.timeline}>
        {[...history].reverse().map((entry, i) => (
          <div key={i} className={styles.entry}>
            <div className={styles.left}>
              <span
                className={styles.dot}
                style={{ background: STATUS_COLOR[entry.status] || "#64748b" }}
              />
              {i < history.length - 1 && <span className={styles.line} />}
            </div>
            <div className={styles.content}>
              <span
                className={styles.status}
                style={{
                  color: STATUS_COLOR[entry.status] || "#64748b",
                  background: STATUS_BG[entry.status] || "#f1f5f9",
                }}
              >
                {entry.status}
              </span>
              <span className={styles.date}>{formatDate(entry.date)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusHistory;