import React from "react";
import styles from "./ApplicationPipeline.module.css";
import {
  PIPELINE_STAGES,
  getProgressPercent,
  isStageCompleted,
  isCurrentStage,
  getStatusColor,
} from "../../utils/pipelineUtils";

const STAGE_ICONS = {
  Applied: "✦",
  Screening: "◎",
  Interview: "◈",
  Offer: "★",
};

const ApplicationPipeline = ({ status, onStatusChange }) => {
  const progress = getProgressPercent(status);
  const isRejected = status === "Rejected";

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>Application Pipeline</h3>
          <p className={styles.subtitle}>Track your progress through stages</p>
        </div>
        <select
          className={styles.dropdown}
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          {PIPELINE_STAGES.map((stage) => (
            <option key={stage} value={stage}>{stage}</option>
          ))}
          <option value="Rejected">Rejected</option>
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
          {/* Progress track */}
          <div className={styles.trackWrapper}>
            <div className={styles.track}>
              <div
                className={styles.trackFill}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Stages */}
          <div className={styles.stages}>
            {PIPELINE_STAGES.map((stage) => {
              const completed = isStageCompleted(status, stage);
              const current = isCurrentStage(status, stage);
              return (
                <button
                  key={stage}
                  className={`${styles.stage} ${completed ? styles.completed : ""} ${current ? styles.current : ""}`}
                  onClick={() => onStatusChange(stage)}
                  title={`Set to ${stage}`}
                >
                  <div className={styles.node}>
                    {completed ? (
                      <span className={styles.checkmark}>✓</span>
                    ) : (
                      <span className={styles.stageIcon}>{STAGE_ICONS[stage]}</span>
                    )}
                    {current && <span className={styles.pulse} />}
                  </div>
                  <span className={styles.stageLabel}>{stage}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Date hint */}
      {!isRejected && (
        <p className={styles.hint}>
          Click any stage to update your status
        </p>
      )}
    </div>
  );
};

export default ApplicationPipeline;