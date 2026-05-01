import React from "react";
import styles from "./JobCard.module.css";
import { MapPin, Calendar, Briefcase, IndianRupee, ExternalLink } from "lucide-react";

const statusConfig = {
  applied:    { label: "Applied",    color: "#3b82f6", bg: "rgba(59,130,246,0.10)"  },
  interview:  { label: "Interview",  color: "#8b5cf6", bg: "rgba(139,92,246,0.10)"  },
  offered:    { label: "Offered",    color: "#10b981", bg: "rgba(16,185,129,0.10)"  },
  rejected:   { label: "Rejected",   color: "#ef4444", bg: "rgba(239,68,68,0.10)"   },
  ghosted:    { label: "Ghosted",    color: "#f59e0b", bg: "rgba(245,158,11,0.10)"  },
  withdrawn:  { label: "Withdrawn",  color: "#6b7280", bg: "rgba(107,114,128,0.10)" },
};

const JobCard = ({ job, onClick }) => {
  const statusKey = job.status?.toLowerCase() || "applied";
  const status = statusConfig[statusKey] || statusConfig.applied;

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.cardLeft}>
        {/* Company initial avatar */}
        <div className={styles.avatar}>
          {job.company?.charAt(0)?.toUpperCase() || "?"}
        </div>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.topRow}>
          <div>
            <h3 className={styles.role}>{job.role}</h3>
            <p className={styles.company}>{job.company}</p>
          </div>
          <span
            className={styles.status}
            style={{ color: status.color, background: status.bg }}
          >
            {status.label}
          </span>
        </div>

        <div className={styles.metaRow}>
          <span className={styles.metaItem}>
            <MapPin size={12} />
            {job.location || "Remote"}
          </span>
          <span className={styles.metaDot} />
          <span className={styles.metaItem}>
            <Calendar size={12} />
            {job.appliedDate
              ? new Date(job.appliedDate).toLocaleDateString("en-IN", {
                  day: "numeric", month: "short", year: "numeric",
                })
              : "No date"}
          </span>
          <span className={styles.metaDot} />
          <span className={styles.metaItem}>
            <Briefcase size={12} />
            {job.platform}
          </span>
          {job.salary?.expected && (
            <>
              <span className={styles.metaDot} />
              <span className={styles.metaItem}>
                <IndianRupee size={12} />
                {job.salary.expected}
              </span>
            </>
          )}
        </div>
      </div>

      <div className={styles.cardArrow}>
        <ExternalLink size={14} />
      </div>
    </div>
  );
};

export default JobCard;