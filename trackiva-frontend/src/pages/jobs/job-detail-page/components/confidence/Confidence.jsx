import React, { useState, useEffect } from "react";
import styles from "./Confidence.module.css";
import { updateJob } from "../../../../../api/jobs";
import { showSuccess, showError, showLoading, dismissToast } from "../../../../../utils/toast";

const getColor = (value) => {
  if (value >= 70) return "#10b981";
  if (value >= 40) return "#f59e0b";
  return "#ef4444";
};

const getLabel = (value) => {
  if (value >= 80) return "Very Confident";
  if (value >= 60) return "Confident";
  if (value >= 40) return "Uncertain";
  if (value >= 20) return "Low";
  return "Very Low";
};

const Confidence = ({ value = 0, jobId, refetch }) => {
  const [input, setInput] = useState(value);

  useEffect(() => {
    setInput(value);
  }, [value]);

  const handleSave = async () => {
    if (input === "" || input === undefined) return;

    const toastId = showLoading("Updating confidence...");

    try {
      await updateJob(jobId, { confidenceScore: Number(input) });
      dismissToast(toastId);
      showSuccess("Confidence updated");
      refetch();
    } catch (err) {
      dismissToast(toastId);
      showError("Failed to update confidence");
    }
  };

  const handleSlider = (e) => {
    setInput(Number(e.target.value));
  };

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const color = getColor(value);

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Confidence Score</h3>

      <div className={styles.body}>
        <div className={styles.circleWrapper}>
          <svg width="110" height="110">
            <circle cx="55" cy="55" r={radius} className={styles.bgCircle} />
            <circle
              cx="55"
              cy="55"
              r={radius}
              className={styles.progressCircle}
              style={{
                stroke: color,
                strokeDasharray: circumference,
                strokeDashoffset: offset,
              }}
            />
          </svg>
          <div className={styles.center}>
            <span className={styles.pct} style={{ color }}>{value}</span>
          </div>
        </div>

        <div className={styles.rightSection}>
          <span className={styles.label} style={{ color }}>
            {getLabel(value)}
          </span>

          <input
            type="range"
            min={0}
            max={100}
            value={input}
            onChange={handleSlider}
            className={styles.slider}
          />

          <div className={styles.inputRow}>
            <input
              type="number"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={styles.numberInput}
            />
            <button className={styles.saveBtn} onClick={handleSave}>
              Set
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confidence;