import React from "react";
import styles from "./PlatformFooter.module.css";
import FooterCard from "../../../components/footer-card/FooterCard";

import {
  Zap,
  BarChart3,
  Target,
} from "lucide-react";

const PlatformFooter = () => {
  const footerData = [
    {
      title: "Best Performance",
      description:
        "<span>Indeed</span> has your highest response rate at <span>65.6%</span>",
      subText: "Consider focusing more applications on this platform",
      icon: BarChart3,
      color: "blue",
    },
    {
      title: "Fastest Response",
      description:
        "<span>LinkedIn</span> averages <span>5 days</span> response time",
      subText: "Expect quicker feedback on this platform",
      icon: Zap,
      color: "green",
    },
    {
      title: "Interview Rate",
      description:
        "Your overall interview rate is <span>24.2%</span>",
      subText: "Above industry average of 15-20%",
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