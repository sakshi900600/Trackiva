import React from "react";
import styles from "./ApplicationPipeline.module.css";

import {
  PIPELINE_STAGES,
  getProgressPercent,
  isStageCompleted,
} from "../../utils/pipelineUtils";

const ApplicationPipeline = ({ status, onStatusChange }) => {
  const progress = getProgressPercent(status);

  return (
    <div className={styles.card}>
      {/* Header */}
      <div className={styles.header}>
        <h3 className={styles.title}>Application Pipeline</h3>

        <select
          className={styles.dropdown}
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          {PIPELINE_STAGES.map((stage) => (
            <option key={stage} value={stage}>
              {stage}
            </option>
          ))}
        </select>
      </div>

      {/* Progress Bar */}
      <div className={styles.pipelineContainer}>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Stages */}
        <div className={styles.stages}>
          {PIPELINE_STAGES.map((stage) => {
            const completed = isStageCompleted(status, stage);

            return (
              <div key={stage} className={styles.stageItem}>
                <div
                  className={`${styles.circle} ${
                    completed ? styles.active : ""
                  }`}
                >
                  {completed && <span className={styles.dot} />}
                </div>
                <span className={styles.label}>{stage}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ApplicationPipeline;