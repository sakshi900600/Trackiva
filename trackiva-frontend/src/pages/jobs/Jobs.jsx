import React, { useState, useCallback } from "react";
import styles from "./Jobs.module.css";
import ActionButtons from "./action-btns/ActionButtons";
import JobStats from "./job-stats/JobStats";
import Resources from "./resources/Resources";
import JobFooter from "./job-footer/JobFooter";
import JobList from "./job-list/JobList";

const Jobs = () => {
  // Increment this to trigger a refresh in any child that depends on it
  const [refreshKey, setRefreshKey] = useState(0);
  const triggerRefresh = useCallback(() => setRefreshKey(k => k + 1), []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Job Tracker</h1>
        <p className={styles.subtitle}>Manage your applications, track progress, and stay organized.</p>
      </div>
      <ActionButtons refreshJobs={triggerRefresh} />
      <JobStats refreshKey={refreshKey} />
      <Resources />
      <JobList refreshKey={refreshKey} />
      <JobFooter />
    </div>
  );
};

export default Jobs;