import React from "react";
import styles from "./JobInfo.module.css";

// Icons (you can replace with your icon library later)
import { FaMapMarkerAlt, FaDollarSign, FaCalendarAlt } from "react-icons/fa";
import { MdUpdate } from "react-icons/md";

const JobInfo = ({ jobInfo }) => {
  const { location, salary, appliedDate, lastUpdated } = jobInfo;

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Job Details</h3>

      <div className={styles.grid}>
        {/* Location */}
        <div className={styles.item}>
          <div className={`${styles.iconBox} ${styles.blue}`}>
            <FaMapMarkerAlt />
          </div>
          <div>
            <p className={styles.label}>Location</p>
            <p className={styles.value}>{location}</p>
          </div>
        </div>

        {/* Salary */}
        <div className={styles.item}>
          <div className={`${styles.iconBox} ${styles.green}`}>
            <FaDollarSign />
          </div>
          <div>
            <p className={styles.label}>Salary Range</p>
            <p className={styles.value}>{salary}</p>
          </div>
        </div>

        {/* Applied Date */}
        <div className={styles.item}>
          <div className={`${styles.iconBox} ${styles.purple}`}>
            <FaCalendarAlt />
          </div>
          <div>
            <p className={styles.label}>Applied Date</p>
            <p className={styles.value}>{appliedDate}</p>
          </div>
        </div>

        {/* Last Updated */}
        <div className={styles.item}>
          <div className={`${styles.iconBox} ${styles.orange}`}>
            <MdUpdate />
          </div>
          <div>
            <p className={styles.label}>Last Update</p>
            <p className={styles.value}>{lastUpdated}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobInfo;