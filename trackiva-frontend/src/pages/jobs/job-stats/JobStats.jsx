import React, { useEffect, useState } from "react";
import styles from "./JobStats.module.css";
import StatCard from "../../../components/stat-card/StatCard";
import { getAnalytics } from "../../../api/analytics";

// Icons
import {
  Briefcase,
  CalendarCheck,
  BadgeCheck,
  XCircle,
} from "lucide-react";

const JobStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getAnalytics();
        setStats(res.data.jobStats);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // 🔥 Loading state
  if (loading) {
    return (
      <div className={styles.container}>
        <p className={styles.placeholder}>Loading stats...</p>
      </div>
    );
  }

  // 🔥 Empty state
  if (!stats || stats.totalApplications.value === 0) {
    return (
      <div className={styles.container}>
        <p className={styles.placeholder}>
          No applications yet. Start adding jobs 🚀
        </p>
      </div>
    );
  }

  // 🔥 Map backend → UI
  const statsData = [
    {
      title: "Total Applications",
      value: stats.totalApplications.value,
      changeText: `+${stats.totalApplications.thisWeek} this week`,
      icon: Briefcase,
      color: "blue",
    },
    {
      title: "Interviews",
      value: stats.interviews.value,
      changeText: `+${stats.interviews.thisWeek} this week`,
      icon: CalendarCheck,
      color: "purple",
    },
    {
      title: "Offers",
      value: stats.offers.value,
      changeText: `+${stats.offers.thisWeek} this week`,
      icon: BadgeCheck,
      color: "green",
    },
    {
      title: "Rejections",
      value: stats.rejections.value,
      changeText: `${stats.rejections.thisWeek} this week`,
      icon: XCircle,
      color: "red",
    },
  ];

  return (
    <div className={styles.container}>
      {statsData.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default JobStats;