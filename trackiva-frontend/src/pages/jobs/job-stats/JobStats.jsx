import React, { useEffect, useState } from "react";
import styles from "./JobStats.module.css";
import StatCard from "../../../components/stat-card/StatCard";
import { getAnalytics } from "../../../api/analytics";
import { Briefcase, CalendarCheck, BadgeCheck, XCircle } from "lucide-react";

const JobStats = ({ refreshKey }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
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
  }, [refreshKey]); // re-runs whenever parent increments refreshKey

  if (loading) {
    return (
      <div className={styles.container}>
        <p className={styles.placeholder}>Loading stats...</p>
      </div>
    );
  }

  if (!stats) return null;

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