import React from "react";
import styles from "./Dashboard.module.css";
import WelcomeCard from "./welcome-card/WelcomeCard";
import QuoteCard from "./quote-card/QuoteCard";
import RecentJobs from "./recent-jobs/RecentJobs";
import Tasks from "./tasks/Tasks";
import DashboardFooter from "./dashboard-footer/DashboardFooter";

const Dashboard = () => {
  return (
    <div className={styles.container}>

      {/* Row 1 */}
      <div className={styles.row}>
        <div className={styles.col80}>
          <WelcomeCard />
        </div>
        <div className={styles.col20}>
          <QuoteCard />
        </div>
      </div>

      {/* Row 2 */}
      <div className={styles.row}>
        <div className={styles.col80}>
          <RecentJobs />
        </div>
        <div className={styles.col20}>
          <Tasks />
        </div>
      </div>

      <DashboardFooter />

    </div>
  );
};

export default Dashboard;