// footer/footer-card/FooterCard.jsx

import React from "react";
import styles from "./FooterCard.module.css";

const FooterCard = ({ title, description, subText, icon: Icon, color }) => {
  return (
    <div className={`${styles.card} ${styles[color]}`}>
      
      {/* Icon */}
      <div className={`${styles.iconWrapper} ${styles[`${color}Icon`]}`}>
        <Icon className={styles.icon} />
      </div>

      {/* Title */}
      <h3 className={styles.title}>{title}</h3>

      {/* Description */}
      <p
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: description }}
      />

      {/* Subtext */}
      <p className={styles.subText}>{subText}</p>
    </div>
  );
};

export default FooterCard;