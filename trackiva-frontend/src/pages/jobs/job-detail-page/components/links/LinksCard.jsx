import React from "react";
import styles from "./LinksCard.module.css";

const LinksCard = ({ links = {} }) => {
  const entries = Object.entries(links).filter(([_, val]) => val);

  if (entries.length === 0) {
    return (
      <div className={styles.card}>
        <h3 className={styles.title}>Links</h3>
        <p className={styles.empty}>No links added</p>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Links</h3>

      <div className={styles.list}>
        {entries.map(([key, url]) => (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            <span className={styles.linkLabel}>{key}</span>
            <span className={styles.linkUrl}>
              {url.replace(/^https?:\/\//, "").split("/")[0]}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LinksCard;