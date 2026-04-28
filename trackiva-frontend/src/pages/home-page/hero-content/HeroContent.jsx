import React from "react";
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
          {trendPositive ? (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 7L5 3L8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 3L5 7L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {trend}
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
        <a href="#" className={styles.btnPrimary}>
          
          Start Tracking Free
        </a>
        <a href="#" className={styles.btnSecondary}>
          See How It Works
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8M7.5 4l3.5 3-3.5 3" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

      {/* Floating stat card — left */}
      <StatCard
        className={styles.cardLeft}
        iconBg="rgba(249,115,22,0.1)"
        icon={
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="7" cy="5.5" r="2.8" fill="#f97316"/>
            <path d="M2 14.5c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="13.5" cy="4.5" r="1.8" fill="#fbbf24" opacity="0.8"/>
          </svg>
        }
        label="Applications Tracked"
        value="+140"
        trend="40%"
        trendPositive={true}
      />

      {/* Floating stat card — right */}
      <StatCard
        className={styles.cardRight}
        iconBg="rgba(139,92,246,0.1)"
        icon={
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="2" y="3" width="14" height="12" rx="2.5" fill="#8b5cf6" opacity="0.15"/>
            <rect x="2" y="3" width="14" height="12" rx="2.5" stroke="#8b5cf6" strokeWidth="1.4"/>
            <path d="M6 3V2M12 3V2M2 7h14" stroke="#8b5cf6" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        }
        label="Interviews Scheduled"
        value="+100"
        trend="20%"
        trendPositive={true}
      />

      {/* Success pill */}
      <div className={styles.jackLabel}>🎉 Hired at Razorpay!</div>

    </div>
  );
}