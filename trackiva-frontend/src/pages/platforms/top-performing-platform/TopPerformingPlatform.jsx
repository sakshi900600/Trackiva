import React, { useState, useMemo } from "react";
import styles from "./TopPerformingPlatform.module.css";
import PlatformCard from "./platform-card/PlatformCard";
import { HiOutlineBriefcase } from "react-icons/hi";
import { FaBriefcase, FaUserCheck, FaGift } from "react-icons/fa";
import { useAnalytics } from "../../../hooks/useAnalytics";

const TopPerformingPlatform = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const { data, loading } = useAnalytics(activeFilter);

  const filters = [
    { key: "week", label: "This Week" },
    { key: "month", label: "This Month" },
    { key: "year", label: "This Year" },
    { key: "all", label: "All Time" },
  ];

  const platforms = data?.platforms || [];

  // 🔥 TOP 3 sorted by response rate
  const topPlatforms = useMemo(() => {
    return [...platforms]
      .sort(
        (a, b) =>
          parseFloat(b.responseRate || 0) -
          parseFloat(a.responseRate || 0)
      )
      .slice(0, 3)
      .map((p) => ({
        icon: <HiOutlineBriefcase />,
        name: p.name.toLowerCase(), // 🔥 important for URL consistency
        totalApplications: p.applications,
        responseRate: Number(p.responseRate || 0),

        stats: [
          {
            icon: <FaBriefcase />,
            value: p.applications,
          },
          {
            icon: <FaUserCheck />,
            value: p.interviews,
          },
          {
            icon: <FaGift />,
            value: p.offers,
          },
          {
            icon: "⏱",
            value: "—",
          },
        ],
      }));
  }, [platforms]);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h2>Top Performing Platforms</h2>

        <div className={styles.filters}>
          {filters.map((filter) => (
            <button
              key={filter.key}
              className={`${styles.filterBtn} ${
                activeFilter === filter.key ? styles.active : ""
              }`}
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <HiOutlineBriefcase />
          </div>
          <h3>Loading...</h3>
        </div>
      ) : topPlatforms.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <HiOutlineBriefcase />
          </div>
          <h3>No platform data</h3>
          <p>Start applying to jobs to track your performance here.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {topPlatforms.map((platform, index) => (
            <PlatformCard key={index} data={platform} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TopPerformingPlatform;