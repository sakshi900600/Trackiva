import React from "react";
import styles from "./PlatformFooter.module.css";
import FooterCard from "../../../components/footer-card/FooterCard";

import {
  Zap,
  BarChart3,
  Target,
} from "lucide-react";

import { useAnalytics } from "../../../hooks/useAnalytics";

const PlatformFooter = () => {
  const { data, loading, error } = useAnalytics("all");

  // ─────────────────────────────────────────────
  // Loading State
  // ─────────────────────────────────────────────
  if (loading) {
    return (
      <div className={styles.container}>
        <p className={styles.message}>Loading insights...</p>
      </div>
    );
  }

  // ─────────────────────────────────────────────
  // Error State
  // ─────────────────────────────────────────────
  if (error) {
    return (
      <div className={styles.container}>
        <p className={styles.error}>{error}</p>
      </div>
    );
  }

  // ─────────────────────────────────────────────
  // Backend Data
  // ─────────────────────────────────────────────
  const overview = data?.overview || {};
  const platforms = data?.platforms || [];

  // Convert safely to numbers
  const interviewRate = Number(overview?.interviewRate || 0);

  // ─────────────────────────────────────────────
  // Best Platform (highest response rate)
  // ─────────────────────────────────────────────
  const bestPlatform =
    [...platforms].sort(
      (a, b) =>
        Number(b.responseRate || 0) - Number(a.responseRate || 0)
    )[0] || null;

  // ─────────────────────────────────────────────
  // Fastest Response Platform
  // Since backend doesn't provide avgResponseDays,
  // we'll estimate based on response rate for now
  // ─────────────────────────────────────────────
  const fastestPlatform =
    [...platforms].sort(
      (a, b) =>
        Number(b.responseRate || 0) - Number(a.responseRate || 0)
    )[0] || null;

  // ─────────────────────────────────────────────
  // Footer Cards
  // ─────────────────────────────────────────────
  const footerData = [
    {
      title: "Best Performance",
      description: `
        <span>${bestPlatform?.name || "N/A"}</span> has your highest response rate at 
        <span>${Number(bestPlatform?.responseRate || 0).toFixed(1)}%</span>
      `,
      subText:
        Number(bestPlatform?.responseRate || 0) >= 50
          ? "This platform is performing really well for you"
          : "Try optimizing your applications on this platform",
      icon: BarChart3,
      color: "blue",
    },

    {
      title: "Top Platform",
      description: `
        <span>${fastestPlatform?.name || "N/A"}</span> currently has your best engagement
      `,
      subText:
        Number(fastestPlatform?.responseRate || 0) > 0
          ? "You are getting responses from this platform"
          : "No responses received yet from platforms",
      icon: Zap,
      color: "green",
    },

    {
      title: "Interview Rate",
      description: `
        Your overall interview rate is 
        <span>${interviewRate.toFixed(1)}%</span>
      `,
      subText:
        interviewRate >= 20
          ? "Above industry average of 15-20%"
          : "Keep improving your resume and targeting",
      icon: Target,
      color: "purple",
    },
  ];

  return (
    <div className={styles.container}>
      {footerData.map((item, index) => (
        <FooterCard key={index} {...item} />
      ))}
    </div>
  );
};

export default PlatformFooter;