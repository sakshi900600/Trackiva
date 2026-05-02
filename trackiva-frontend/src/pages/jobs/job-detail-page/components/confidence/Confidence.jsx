import React, { useState, useEffect } from "react";
import styles from "./Confidence.module.css";

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

const Confidence = ({ value, setValue }) => {
  const [input, setInput] = useState(value);

  useEffect(() => { setInput(value); }, [value]);

  const handleChange = (e) => {
    const val = e.target.value;
    if (val === "") { setInput(""); return; }
    setInput(Math.max(0, Math.min(100, Number(val))));
  };

  const handleSave = () => {
    if (input === "" || input === undefined) return;
    setValue(Number(input));
  };

  const handleSlider = (e) => {
    const val = Number(e.target.value);
    setInput(val);
    setValue(val);
  };

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const color = getColor(value);

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Confidence Score</h3>

      <div className={styles.body}>
        {/* Circle */}
        <div className={styles.circleWrapper}>
          <svg width="110" height="110" viewBox="0 0 110 110" className={styles.svg}>
            <circle cx="55" cy="55" r={radius} className={styles.bgCircle} />
            <circle
              cx="55" cy="55" r={radius}
              className={styles.progressCircle}
              style={{
                stroke: color,
                strokeDasharray: circumference,
                strokeDashoffset: offset,
                transition: "stroke-dashoffset 0.5s ease, stroke 0.3s ease",
              }}
            />
          </svg>
          <div className={styles.center}>
            <span className={styles.pct} style={{ color }}>{value}</span>
            <span className={styles.pctSign}></span>
          </div>
        </div>

        <div className={styles.rightSection}>
          <span className={styles.label} style={{ color, background: `${color}15` }}>
            {getLabel(value)}
          </span>

          <input
            type="range"
            min={0} max={100}
            value={typeof input === "number" ? input : 0}
            onChange={handleSlider}
            className={styles.slider}
            style={{ "--slider-color": color }}
          />

          <div className={styles.inputRow}>
            <input
              type="number"
              value={input}
              onChange={handleChange}
              className={styles.numberInput}
              min={0} max={100}
              placeholder="0-100"
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