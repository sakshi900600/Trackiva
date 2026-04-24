import React, { useState } from "react";
import styles from "./Extras.module.css";

const Extras = ({ extras, setExtras }) => {
  const [skillInput, setSkillInput] = useState("");

  // Toggle boolean fields
  const toggleField = (field) => {
    setExtras((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Add skill
  const addSkill = () => {
    if (!skillInput.trim()) return;

    setExtras((prev) => ({
      ...prev,
      skillGap: [...prev.skillGap, skillInput],
    }));

    setSkillInput("");
  };

  // Remove skill
  const removeSkill = (skill) => {
    setExtras((prev) => ({
      ...prev,
      skillGap: prev.skillGap.filter((s) => s !== skill),
    }));
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Extras</h3>

      {/* Referral */}
      <div className={styles.row}>
        <span>Referral</span>
        <button onClick={() => toggleField("referral")}>
          {extras.referral ? "Yes" : "No"}
        </button>
      </div>

      {/* Cover Letter */}
      <div className={styles.row}>
        <span>Cover Letter</span>
        <button onClick={() => toggleField("coverLetter")}>
          {extras.coverLetter ? "Used" : "Not Used"}
        </button>
      </div>

      {/* Skill Gap */}
      <div className={styles.skillSection}>
        <p className={styles.label}>Skill Gap</p>

        <div className={styles.skillInput}>
          <input
            type="text"
            placeholder="Add skill"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
          />
          <button onClick={addSkill}>Add</button>
        </div>

        <div className={styles.skills}>
          {extras.skillGap.map((skill, index) => (
            <div key={index} className={styles.skill}>
              {skill}
              <span onClick={() => removeSkill(skill)}>✕</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Extras;