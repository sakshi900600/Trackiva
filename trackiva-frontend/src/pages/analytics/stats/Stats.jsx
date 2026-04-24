import React from "react";
import styles from "./Stats.module.css";
import StatCard from "../../../components/stat-card/StatCard";
import { Target, Clock, BarChart3, Trophy } from "lucide-react";

const Stats = ({ data, loading }) => {
  const statsData = [
    {
      title: "Success Rate",
      value: loading ? "..." : `${data?.successRate || 0}%`,
      changeText: "Overall conversion",
      icon: Target,
      color: "green",
    },
    {
      title: "Avg Response Time",
      value: loading ? "..." : data?.avgResponseTime || "0d",
      changeText: "Across all platforms",
      icon: Clock,
      color: "blue",
    },
    {
      title: "Interview Rate",
      value: loading ? "..." : `${data?.interviewRate || 0}%`,
      changeText: "Applied to Interview",
      icon: BarChart3,
      color: "purple",
    },
    {
      title: "Offer Conversion",
      value: loading ? "..." : `${data?.offerConversion || 0}%`,
      changeText: "Interview to Offer",
      icon: Trophy,
      color: "orange",
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

export default Stats;