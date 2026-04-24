import React from "react";
import styles from "./QuickActions.module.css";

const QuickActions = () => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Quick Actions</h3>

      <div className={styles.actions}>
        <button className={styles.btn}>Follow Up</button>
        <button className={styles.btn}>Schedule</button>
        <button className={styles.btn}>Update Resume</button>
      </div>
    </div>
  );
};

export default QuickActions;