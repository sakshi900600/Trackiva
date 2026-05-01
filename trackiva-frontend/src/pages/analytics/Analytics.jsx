import React from "react";
import styles from "./Analytics.module.css";
import Stats from "../analytics/stats/Stats";
import Graphs from "../analytics/graphs/Graphs";
import Footer from "./footer/Footer";
import { useAnalytics } from "../../hooks/useAnalytics";

const Analytics = () => {
  const { data, loading, error } = useAnalytics("all");

  // 🔴 Error state
  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  // 🟡 Loading state
  if (loading) {
    return <div className={styles.loading}>Loading analytics...</div>;
  }


  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Analytics Dashboard</h1>
        <p className={styles.subtitle}>
          Comprehensive insights into your job search performance and trends
        </p>
      </div>

      {/* ✅ FIXED DATA MAPPING */}
      <Stats data={data.overview} loading={loading} />

      <Graphs
        data={{
          statusDistribution: data.statusDistribution,
          trends: data.trends,
          funnel: data.funnel,
        }}
        loading={loading}
      />

      <Footer
  data={{
    platforms: data.platforms,
    trends: data.trends,
    overview: data.overview,
  }}
  loading={loading}
/>
    </div>
  );
};

export default Analytics;