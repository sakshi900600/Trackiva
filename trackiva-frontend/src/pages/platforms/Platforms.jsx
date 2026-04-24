import React from "react";
import styles from "./Platforms.module.css";
import TopPerformingPlatform from "./top-performing-platform/TopPerformingPlatform";
import PlatformFooter from "./platform-footer/PlatformFooter";
import PlatformTable from "./platform-table/PlatformTable";

const Platforms = () => {
  return (
    <div className={styles.container}>
      
      {/* 🔹 Header Section */}
      <div className={styles.header}>
        <h1 className={styles.title}>Platform Performance</h1>
        <p className={styles.subtitle}>
          Compare your application success across different job platforms
        </p>
      </div>

      {/* 🔹 Top Performing Platforms */}
      <TopPerformingPlatform />

      {/* 🔹 Platform Table */}
      <PlatformTable />
      
      {/* 🔹 Footer Insights */}
      <PlatformFooter />

      

    </div>
  );
};

export default Platforms;