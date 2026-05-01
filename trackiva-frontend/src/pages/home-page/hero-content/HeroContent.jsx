import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./HeroContent.module.css";

function StatCard({ className, iconBg, icon, label, value, trend, trendPositive }) {
  return (
    <div className={`${styles.statCard} ${className}`}>
      <div className={styles.statTop}>
        <div className={styles.statIcon} style={{ background: iconBg }}>{icon}</div>
        <button className={styles.statDots}>···</button>
      </div>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statRow}>
        <span className={styles.statValue}>{value}</span>
        <span className={`${styles.statTrend} ${trendPositive ? styles.up : styles.down}`}>
          {trendPositive ? "↑" : "↓"} {trend}
        </span>
      </div>
      <div className={styles.statVs}>VS last month</div>
      <div className={styles.statMiniBars}>
        {[false, false, false, true, true, false].map((active, i) => (
          <div key={i} className={`${styles.miniBar} ${active ? styles.miniBarActive : ""}`} />
        ))}
      </div>
    </div>
  );
}

export default function HeroContent() {
  const navigate = useNavigate();

  const handleScroll = () => {
    navigate("/");
    setTimeout(() => {
      const section = document.getElementById("how-it-works");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className={styles.heroContent}>
      <div className={styles.badge}>
        <span className={styles.badgeDot} />
        Track every job application, effortlessly
      </div>

      <h1 className={styles.headline}>
        Track Applications. <span className={styles.highlight}>Spot Patterns.</span><br />
        Land Your Dream Job Faster
      </h1>

      <p className={styles.subtext}>
        Stop losing track of where you applied. Trackiva logs every application, tracks
        every status, and shows you exactly which resume, portal, and strategy gets you hired.
      </p>

      <div className={styles.buttons}>
        <Link to="/login" className={styles.btnPrimary}>
          Start Tracking Free
        </Link>

        <button onClick={handleScroll} className={styles.btnSecondary}>
          See How It Works →
        </button>
      </div>

      <StatCard
        className={styles.cardLeft}
        iconBg="rgba(249,115,22,0.1)"
        icon={<div style={{ width: 18, height: 18, background: "#f97316", borderRadius: "50%" }} />}
        label="Applications Tracked"
        value="+140"
        trend="40%"
        trendPositive={true}
      />

      <StatCard
        className={styles.cardRight}
        iconBg="rgba(139,92,246,0.1)"
        icon={<div style={{ width: 18, height: 18, background: "#8b5cf6", borderRadius: "4px" }} />}
        label="Interviews Scheduled"
        value="+100"
        trend="20%"
        trendPositive={true}
      />

      <div className={styles.jackLabel}>🎉 Hired at Razorpay!</div>
    </div>
  );
}