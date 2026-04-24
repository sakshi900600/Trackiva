import React from "react";
import styles from "./CardView.module.css";

const CardItem = ({ title, subtitle, children, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      
      <div className={styles.cardHeader}>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>

      <div className={styles.cardBody}>
        {children}
      </div>

    </div>
  );
};

export default CardItem;