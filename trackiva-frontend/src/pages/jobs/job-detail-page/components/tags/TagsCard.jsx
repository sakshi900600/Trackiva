import React, { useState } from "react";
import styles from "./TagsCard.module.css";

const TAG_COLORS = [
  ["#eff6ff", "#2563eb"],
  ["#f0fdf4", "#16a34a"],
  ["#fdf4ff", "#9333ea"],
  ["#fff7ed", "#ea580c"],
  ["#ecfdf5", "#059669"],
  ["#fef9c3", "#ca8a04"],
];

const TagsCard = ({ tags, setTags }) => {
  const [input, setInput] = useState("");

  const addTag = () => {
    const tag = input.trim();
    if (!tag || tags.includes(tag)) return;
    setTags([...tags, tag]);
    setInput("");
  };

  const removeTag = (tag) => setTags(tags.filter((t) => t !== tag));

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Tags</h3>

      <div className={styles.tagList}>
        {tags.map((tag, i) => {
          const [bg, color] = TAG_COLORS[i % TAG_COLORS.length];
          return (
            <span key={tag} className={styles.tag} style={{ background: bg, color }}>
              {tag}
              <button
                className={styles.remove}
                onClick={() => removeTag(tag)}
                style={{ color }}
              >
                ✕
              </button>
            </span>
          );
        })}
        {tags.length === 0 && <span className={styles.empty}>No tags yet</span>}
      </div>

      <div className={styles.addRow}>
        <input
          type="text"
          placeholder="Add a tag…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTag()}
          className={styles.input}
        />
        <button className={styles.addBtn} onClick={addTag} disabled={!input.trim()}>
          Add
        </button>
      </div>
    </div>
  );
};

export default TagsCard;