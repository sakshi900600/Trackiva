import React from "react";
import styles from "./JobCard.module.css";

import {
  MapPin,
  Calendar,
  Briefcase,
  IndianRupee,
} from "lucide-react";

const JobCard = ({ job, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      {/* Top */}
      <div className={styles.top}>
        <div>
          <h3>{job.role}</h3>
          <p className={styles.company}>{job.company}</p>
        </div>

        <span
          className={`${styles.status} ${
            styles[job.status?.toLowerCase()] || styles.applied
          }`}
        >
          {job.status}
        </span>
      </div>

      {/* Middle */}
      <div className={styles.middle}>
        <span>
          <MapPin size={14} /> {job.location || "Remote"}
        </span>

        <span>
          <Calendar size={14} />
          {job.appliedDate
            ? new Date(job.appliedDate).toDateString()
            : "No date"}
        </span>
      </div>

      {/* Meta */}
      <div className={styles.meta}>
        <span>
          <Briefcase size={14} /> {job.platform}
        </span>

        <div className={styles.metaDivider}></div>

        <span>
          <IndianRupee size={14} />
          {job.salary?.expected ?? "Not specified"}
        </span>
      </div>
    </div>
  );
};

export default JobCard;