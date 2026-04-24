import React from "react";
import styles from "./Dashboard.module.css";

import DailyQuote from "./daily-quote/DailyQuote";
import RecentJobs from "./recent-jobs/RecentJobs";
import Tasks from "./tasks/Tasks";
import DashboardFooter from "./dashboard-footer/DashboardFooter";

const sectionStyle = {
  marginBottom: "40px",
};

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <div style={sectionStyle}>
        <DailyQuote />
      </div>

      <div style={sectionStyle}>
        <Tasks />
      </div>

      <div style={sectionStyle}>
        <RecentJobs />
      </div>

      <div>
        <DashboardFooter />
      </div>
    </div>
  );
};

export default Dashboard;