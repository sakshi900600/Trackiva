import React from "react";
import styles from "./StatusHistory.module.css";
import { getStatusColor, getStatusBg } from "../../utils/pipelineUtils";

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
                style={{ background: getStatusColor(entry.status) }}
              />
              {i < history.length - 1 && <span className={styles.line} />}
            </div>
            <div className={styles.content}>
              <span
                className={styles.status}
                style={{
                  color: getStatusColor(entry.status),
                  background: getStatusBg(entry.status),
                }}
              >
                {entry.status}
              </span>
              <span className={styles.date}>{entry.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusHistory;