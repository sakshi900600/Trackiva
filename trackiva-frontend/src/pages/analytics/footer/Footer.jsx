import React from "react";
import styles from "./Footer.module.css";
import FooterCard from "../../../components/footer-card/FooterCard";
import { TrendingUp, Award, Target } from "lucide-react";

const Footer = ({ data, loading }) => {
  if (loading) {
    return <div className={styles.skeleton}>Loading insights...</div>;
  }

  const { platforms = [], trends = [], overview = {} } = data || {};

  // 🔥 1. Peak Activity (from trends)
  let peakMonth = "N/A";
  let peakCount = 0;

  trends.forEach((t) => {
    if (t.applications > peakCount) {
      peakCount = t.applications;
      peakMonth = t.month;
    }
  });

  // 🔥 2. Best Platform (highest response rate)
  let bestPlatform = "N/A";
  let bestRate = 0;

  platforms.forEach((p) => {
    const rate = parseFloat(p.responseRate || 0);
    if (rate > bestRate) {
      bestRate = rate;
      bestPlatform = p.name;
    }
  });

  // 🔥 3. Offer Conversion (from overview)
  const offerConversion = overview?.offerConversion || 0;

  const footerData = [
    {
      title: "Peak Activity",
      description: `Your most active period had <span>${peakCount}</span> applications`,
      subText: peakMonth !== "N/A" ? `In ${peakMonth}` : "Keep applying consistently",
      icon: TrendingUp,
      color: "blue",
    },
    {
      title: "Best Platform",
      description: `<span>${bestPlatform}</span> has your highest response rate`,
      subText: `${bestRate}% response rate`,
      icon: Award,
      color: "green",
    },
    {
      title: "Interview Success",
      description: `Your interview-to-offer conversion is <span>${offerConversion}%</span>`,
      subText: "Based on your applications",
      icon: Target,
      color: "purple",
    },
  ];

  // ⚪ Empty state
  if (!platforms.length && !trends.length) {
    return (
      <div className={styles.empty}>
        <h3>No Insights Yet</h3>
        <p>Add more job data to see insights 🚀</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {footerData.map((item, index) => (
        <FooterCard key={index} {...item} />
      ))}
    </div>
  );
};

export default Footer;