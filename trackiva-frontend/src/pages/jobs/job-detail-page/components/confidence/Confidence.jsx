import React, { useState, useEffect } from "react";
import styles from "./Confidence.module.css";

const Confidence = ({ value, setValue }) => {
  const [input, setInput] = useState(value);

  // Sync with parent
  useEffect(() => {
    setInput(value);
  }, [value]);

  // Handle change
  const handleChange = (e) => {
    let val = e.target.value;

    if (val === "") {
      setInput("");
      return;
    }

    val = Math.max(0, Math.min(100, Number(val)));
    setInput(val);
  };

  // Save
  const handleSave = () => {
    if (input === "") return;
    setValue(Number(input));
  };

  // Circle logic
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Confidence</h3>

      {/* Circle */}
      <div className={styles.circleWrapper}>
        <svg className={styles.svg} width="120" height="120">
          {/* Background */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            className={styles.bg}
          />

          {/* Progress */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            className={styles.progress}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>

        <div className={styles.centerText}>{value}%</div>
      </div>

      {/* Input */}
      <div className={styles.inputSection}>
        <input
          type="number"
          value={input}
          onChange={handleChange}
          className={styles.input}
          placeholder="0-100"
        />

        <button className={styles.saveBtn} onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Confidence;