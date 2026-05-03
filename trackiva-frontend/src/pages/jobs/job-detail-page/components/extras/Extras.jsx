import React, { useState } from "react";
import styles from "./Extras.module.css";

// extras field doesn't exist on backend yet — renders read-only defaults
const Extras = ({ extras }) => {
  const [skillInput, setSkillInput] = useState("");
  const [localExtras, setLocalExtras] = useState({
    referral: false,
    coverLetter: false,
    skillGap: [],
    ...(extras && typeof extras === "object" && !Array.isArray(extras) ? extras : {}),
  });

  const toggle = (field) =>
    setLocalExtras((prev) => ({ ...prev, [field]: !prev[field] }));

  const addSkill = () => {
    const s = skillInput.trim();
    if (!s || localExtras.skillGap.includes(s)) return;
    setLocalExtras((prev) => ({ ...prev, skillGap: [...prev.skillGap, s] }));
    setSkillInput("");
  };

  const removeSkill = (skill) =>
    setLocalExtras((prev) => ({
      ...prev,
      skillGap: prev.skillGap.filter((s) => s !== skill),
    }));

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Application Extras</h3>
      <div className={styles.toggles}>
        <div className={styles.toggleRow}>
          <div className={styles.toggleLeft}>
            <span className={styles.toggleIcon}>🤝</span>
            <p className={styles.toggleLabel}>Referral</p>
          </div>
          <button
            className={`${styles.toggle} ${localExtras.referral ? styles.on : ""}`}
            onClick={() => toggle("referral")}
          >
            <span className={styles.thumb} />
          </button>
        </div>
        <div className={styles.divider} />
        <div className={styles.toggleRow}>
          <div className={styles.toggleLeft}>
            <span className={styles.toggleIcon}>📄</span>
            <p className={styles.toggleLabel}>Cover Letter</p>
          </div>
          <button
            className={`${styles.toggle} ${localExtras.coverLetter ? styles.on : ""}`}
            onClick={() => toggle("coverLetter")}
          >
            <span className={styles.thumb} />
          </button>
        </div>
      </div>

      <div className={styles.skillSection}>
        <p className={styles.skillTitle}>Skill Gaps</p>
        <div className={styles.skillInput}>
          <input
            type="text"
            placeholder="e.g. GraphQL"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addSkill()}
            className={styles.input}
          />
          <button onClick={addSkill} disabled={!skillInput.trim()}>Add</button>
        </div>
        <div className={styles.skills}>
          {localExtras.skillGap.length === 0 ? (
            <span>No skill gaps</span>
          ) : (
            localExtras.skillGap.map((skill) => (
              <span key={skill} className={styles.skill}>
                {skill}
                <button onClick={() => removeSkill(skill)}>✕</button>
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Extras;