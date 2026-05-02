import React, { useState } from "react";
import styles from "./Extras.module.css";

const Extras = ({ extras, setExtras }) => {
  const [skillInput, setSkillInput] = useState("");

  const toggle = (field) => setExtras((prev) => ({ ...prev, [field]: !prev[field] }));

  const addSkill = () => {
    const s = skillInput.trim();
    if (!s || extras.skillGap.includes(s)) return;
    setExtras((prev) => ({ ...prev, skillGap: [...prev.skillGap, s] }));
    setSkillInput("");
  };

  const removeSkill = (skill) =>
    setExtras((prev) => ({ ...prev, skillGap: prev.skillGap.filter((s) => s !== skill) }));

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Application Extras</h3>

      <div className={styles.toggles}>
        <div className={styles.toggleRow}>
          <div className={styles.toggleLeft}>
            <span className={styles.toggleIcon}>🤝</span>
            <div>
              <p className={styles.toggleLabel}>Referral</p>
              <p className={styles.toggleDesc}>Applied via referral?</p>
            </div>
          </div>
          <button
            className={`${styles.toggle} ${extras.referral ? styles.on : ""}`}
            onClick={() => toggle("referral")}
          >
            <span className={styles.thumb} />
          </button>
        </div>

        <div className={styles.divider} />

        <div className={styles.toggleRow}>
          <div className={styles.toggleLeft}>
            <span className={styles.toggleIcon}>📄</span>
            <div>
              <p className={styles.toggleLabel}>Cover Letter</p>
              <p className={styles.toggleDesc}>Included cover letter?</p>
            </div>
          </div>
          <button
            className={`${styles.toggle} ${extras.coverLetter ? styles.on : ""}`}
            onClick={() => toggle("coverLetter")}
          >
            <span className={styles.thumb} />
          </button>
        </div>
      </div>

      <div className={styles.skillSection}>
        <p className={styles.skillTitle}>Skill Gaps</p>
        <p className={styles.skillSub}>Skills you'd need to strengthen</p>

        <div className={styles.skillInput}>
          <input
            type="text"
            placeholder="e.g. GraphQL, Kubernetes…"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addSkill()}
            className={styles.input}
          />
          <button className={styles.addBtn} onClick={addSkill} disabled={!skillInput.trim()}>
            Add
          </button>
        </div>

        <div className={styles.skills}>
          {extras.skillGap.length === 0 && (
            <span className={styles.empty}>No skill gaps noted</span>
          )}
          {extras.skillGap.map((skill) => (
            <span key={skill} className={styles.skill}>
              {skill}
              <button onClick={() => removeSkill(skill)} className={styles.removeSkill}>✕</button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Extras;