import React from "react";
import styles from "./ApplicationPipeline.module.css";

// All lowercase to match backend
const PIPELINE_STAGES = ["applied", "screening", "interview", "offer"];

const STAGE_LABELS = {
  applied: "Applied",
  screening: "Screening",
  interview: "Interview",
  offer: "Offer",
};

const STAGE_ICONS = {
  applied: "✦",
  screening: "◎",
  interview: "◈",
  offer: "★",
};

const STAGE_ORDER = ["applied", "screening", "interview", "offer"];

const getProgressPercent = (status) => {
  const idx = STAGE_ORDER.indexOf(status);
  if (idx === -1) return 0;
  return (idx / (STAGE_ORDER.length - 1)) * 100;
};

const isStageCompleted = (currentStatus, stage) => {
  return STAGE_ORDER.indexOf(currentStatus) > STAGE_ORDER.indexOf(stage);
};

const isCurrentStage = (currentStatus, stage) => currentStatus === stage;

const ApplicationPipeline = ({ status, onStatusChange }) => {
  const normalizedStatus = status?.toLowerCase() || "applied";
  const isRejected = normalizedStatus === "rejected";
  const progress = getProgressPercent(normalizedStatus);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>Application Pipeline</h3>
          <p className={styles.subtitle}>Track your progress through stages</p>
        </div>
        <select
          className={styles.dropdown}
          value={normalizedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          {PIPELINE_STAGES.map((stage) => (
            <option key={stage} value={stage}>
              {STAGE_LABELS[stage]}
            </option>
          ))}
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {isRejected ? (
        <div className={styles.rejectedBanner}>
          <span className={styles.rejectedIcon}>✕</span>
          <div>
            <p className={styles.rejectedTitle}>Application Rejected</p>
            <p className={styles.rejectedSub}>You can reapply or mark this as closed.</p>
          </div>
        </div>
      ) : (
        <div className={styles.pipeline}>
          <div className={styles.trackWrapper}>
            <div className={styles.track}>
              <div className={styles.trackFill} style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div className={styles.stages}>
            {PIPELINE_STAGES.map((stage) => {
              const completed = isStageCompleted(normalizedStatus, stage);
              const current = isCurrentStage(normalizedStatus, stage);
              return (
                <button
                  key={stage}
                  className={`${styles.stage} ${completed ? styles.completed : ""} ${current ? styles.current : ""}`}
                  onClick={() => onStatusChange(stage)}
                  title={`Set to ${STAGE_LABELS[stage]}`}
                >
                  <div className={styles.node}>
                    {completed ? (
                      <span className={styles.checkmark}>✓</span>
                    ) : (
                      <span className={styles.stageIcon}>{STAGE_ICONS[stage]}</span>
                    )}
                    {current && <span className={styles.pulse} />}
                  </div>
                  <span className={styles.stageLabel}>{STAGE_LABELS[stage]}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {!isRejected && (
        <p className={styles.hint}>Click any stage to update your status</p>
      )}
    </div>
  );
};

export default ApplicationPipeline;