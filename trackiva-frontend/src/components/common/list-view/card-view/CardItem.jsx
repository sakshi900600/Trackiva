import React from "react";
import styles from "./CardView.module.css";
import { MapPin, Calendar, Briefcase, TrendingUp, ExternalLink } from "lucide-react";

const statusConfig = {
  applied:   { label: "Applied",   color: "#3b82f6", bg: "rgba(59,130,246,0.10)"  },
  screening: { label: "Screening", color: "#8b5cf6", bg: "rgba(139,92,246,0.10)"  },
  interview: { label: "Interview", color: "#f59e0b", bg: "rgba(245,158,11,0.10)"  },
  offer:     { label: "Offer",     color: "#10b981", bg: "rgba(16,185,129,0.10)"  },
  rejected:  { label: "Rejected",  color: "#ef4444", bg: "rgba(239,68,68,0.10)"   },
};

const confidenceConfig = (score) => {
  if (score >= 75) return { color: "#10b981", bg: "rgba(16,185,129,0.10)", label: "High" };
  if (score >= 45) return { color: "#f59e0b", bg: "rgba(245,158,11,0.10)", label: "Medium" };
  return { color: "#ef4444", bg: "rgba(239,68,68,0.10)", label: "Low" };
};

const CardItem = ({ job, onClick }) => {
  const status = statusConfig[job.status] || statusConfig.applied;
  const confidence = confidenceConfig(job.confidenceScore ?? 50);

  const formattedDate = job.appliedDate
    ? new Date(job.appliedDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  const avatarLetter = job.company?.charAt(0)?.toUpperCase() || "?";

  return (
    <div className={styles.card} onClick={onClick}>

      {/* Top accent bar — colored by status */}
      <div
        className={styles.cardAccentBar}
        style={{ background: status.color }}
      />

      {/* Card Header */}
      <div className={styles.cardHeader}>
        <div className={styles.avatarWrap}>
          <div className={styles.avatar}>{avatarLetter}</div>
        </div>

        <div className={styles.headerRight}>
          <span
            className={styles.statusBadge}
            style={{ color: status.color, background: status.bg }}
          >
            {status.label}
          </span>

          {job.links?.jobUrl && (
            <a
              href={job.links.jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkIcon}
              onClick={(e) => e.stopPropagation()}
              title="View Job Posting"
            >
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>

      {/* Role + Company */}
      <div className={styles.cardMeta}>
        <h3 className={styles.role}>{job.role}</h3>
        <p className={styles.company}>{job.company}</p>
      </div>

      {/* Details */}
      <div className={styles.details}>
        {job.location && (
          <div className={styles.detailItem}>
            <MapPin size={12} />
            <span>{job.location}</span>
          </div>
        )}
        {formattedDate && (
          <div className={styles.detailItem}>
            <Calendar size={12} />
            <span>{formattedDate}</span>
          </div>
        )}
        {job.platform && (
          <div className={styles.detailItem}>
            <Briefcase size={12} />
            <span>{job.platform}</span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className={styles.cardDivider} />

      {/* Footer — confidence score + salary */}
      <div className={styles.cardFooter}>
        <div className={styles.confidenceWrap}>
          <div className={styles.confidenceBarBg}>
            <div
              className={styles.confidenceBarFill}
              style={{
                width: `${job.confidenceScore ?? 50}%`,
                background: confidence.color,
              }}
            />
          </div>
          <span
            className={styles.confidenceLabel}
            style={{ color: confidence.color }}
          >
            {confidence.label}
          </span>
        </div>

        {job.salary?.expected ? (
          <span className={styles.salary}>
            ₹{Number(job.salary.expected).toLocaleString("en-IN")}
          </span>
        ) : (
          <span className={styles.salaryNull}>Salary N/A</span>
        )}
      </div>

      {/* Tags */}
      {job.tags?.length > 0 && (
        <div className={styles.tags}>
          {job.tags.slice(0, 3).map((tag, i) => (
            <span key={i} className={styles.tag}>{tag}</span>
          ))}
          {job.tags.length > 3 && (
            <span className={styles.tagMore}>+{job.tags.length - 3}</span>
          )}
        </div>
      )}

    </div>
  );
};

export default CardItem;