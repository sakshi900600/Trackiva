import React from "react";
import styles from "./PlatformCard.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { HiOutlineBriefcase } from "react-icons/hi";

const PlatformCard = ({ data }) => {
  const interviews = data.stats[0];
  const offers = data.stats[1];
  const rejected = data.stats[2];
  const avg = data.stats[3];

  const orderedStats = [
    {
      ...interviews,
      label: "Interviews",
    },
    {
      ...offers,
      label: "Offers",
    },
    {
      ...rejected,
      label: "Rejected",
      icon: <AiOutlineCloseCircle />, 
    },
    {
      ...avg,
      label: "Avg Response",
    },
  ];

  return (
    <div className={styles.card}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.platformInfo}>
          <div className={styles.icon}><HiOutlineBriefcase /></div>
          <div>
            <h3 className={styles.name}>{data.name}</h3>
            <p className={styles.apps}>
              {data.totalApplications} applications
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        {orderedStats.map((item, index) => (
          <div key={index} className={styles.statBox}>
            <div className={styles.statTop}>
              <span className={styles.statIcon}>{item.icon}</span>
              <span>{item.label}</span>
            </div>
            <h2 className={styles.value}>{item.value}</h2>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className={styles.divider} />

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.responseHeader}>
          <span>Response Rate</span>
          <span>{data.responseRate}%</span>
        </div>

        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${data.responseRate}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default PlatformCard;