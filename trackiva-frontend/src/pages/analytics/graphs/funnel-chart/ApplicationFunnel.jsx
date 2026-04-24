import React, { useState } from "react";
import styles from "./ApplicationFunnel.module.css";
import { Database } from "lucide-react";

const ApplicationFunnel = ({ data, loading }) => {
  const [hovered, setHovered] = useState(null);

  if (loading) return <div className={styles.skeleton}></div>;

  // 1. Check if data exists
  const hasData = data && data.applied > 0;

  if (!hasData) {
    return (
      <div className={styles.card}>
        <div className={styles.emptyState}>
           <Database size={28} />
           <h3>No Funnel Data</h3>
        </div>
      </div>
    );
  }

  // 2. Format the backend data for the rows
  // We calculate width relative to the 'applied' count (the largest part)
  const funnelStages = [
    { name: "Applied", value: data.applied, color: "#3b82f6", width: "100%" },
    { 
      name: "Screening", 
      value: data.screening, 
      color: "#8b5cf6", 
      width: `${(data.screening / data.applied) * 100}%` 
    },
    { 
      name: "Interview", 
      value: data.interview, 
      color: "#a855f7", 
      width: `${(data.interview / data.applied) * 100}%` 
    },
    { 
      name: "Offer", 
      value: data.offer, 
      color: "#22c55e", 
      width: `${(data.offer / data.applied) * 100}%` 
    },
  ];

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2>Application Funnel</h2>
        <p>Conversion rates at each stage</p>
      </div>

      <div className={styles.funnelWrapper}>
        {funnelStages.map((item, index) => (
          <div
            key={index}
            className={styles.row}
            onMouseEnter={() => setHovered(item)}
            onMouseLeave={() => setHovered(null)}
          >
            <div
              className={styles.bar}
              style={{
                width: item.width,
                backgroundColor: item.color,
                minWidth: "20px" // Prevents stage from disappearing if value is very low
              }}
            >
              <span className={styles.value}>{item.value}</span>
            </div>
            <span className={styles.label}>{item.name}</span>
          </div>
        ))}

        {hovered && (
          <div className={styles.tooltip}>
            {hovered.name}: <strong>{hovered.value}</strong>
          </div>
        )}
      </div>

      {/* 3. Mapping the bottom stats from data.conversion */}
      <div className={styles.stats}>
        <div>
          <p>Applied → Screening</p>
          <span>{data.conversion.appliedToScreening}%</span>
        </div>
        <div>
          <p>Screening → Interview</p>
          <span>{data.conversion.screeningToInterview}%</span>
        </div>
        <div>
          <p>Interview → Offer</p>
          <span>{data.conversion.interviewToOffer}%</span>
        </div>
      </div>
    </div>
  );
};

export default ApplicationFunnel;