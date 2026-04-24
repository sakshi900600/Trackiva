import React from "react";
import styles from "./Jobs.module.css";

// Components
import ActionButtons from "./action-btns/ActionButtons";
import JobStats from "./job-stats/JobStats";
import Resources from "./resources/Resources";
import JobFooter from "./job-footer/JobFooter";
import JobList from "./job-list/JobList";

const Jobs = () => {
  return (
    <div className={styles.container}>
      
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Job Tracker</h1>
        <p className={styles.subtitle}>
          Manage your applications, track progress, and stay organized.
        </p>
      </div>

      {/* Action Buttons */}
      <ActionButtons />

      {/* Stats */}
      <JobStats />

      {/* Resources */}
      <Resources />

      {/* job list */}
      <JobList />

      {/* Footer-cards */}
      <JobFooter />

      

    </div>
  );
};

export default Jobs;