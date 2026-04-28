import React from "react";
import styles from "./AnalyticsPreview.module.css";

const stats = [
  { label: "Applications Sent", value: "142", change: "+18 this week", up: true },
  { label: "Response Rate", value: "34%", change: "+8% vs last month", up: true },
  { label: "Interview Rate", value: "12%", change: "+3% vs last month", up: true },
  { label: "Avg. Response Time", value: "9 days", change: "-2 days", up: true },
];

const portalRows = [
  { name: "LinkedIn", apps: 58, responses: 22, rate: "38%", bar: 78 },
  { name: "Indeed", apps: 41, responses: 10, rate: "24%", bar: 49 },
  { name: "Naukri", apps: 28, responses: 7, rate: "25%", bar: 51 },
  { name: "Company Sites", apps: 15, responses: 9, rate: "60%", bar: 100 },
];

export default function AnalyticsPreview() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.left}>
          <span className={styles.eyebrow}>Analytics Dashboard</span>
          <h2 className={styles.title}>
            Stop Guessing. <br />
            <span className={styles.accent}>Start Knowing.</span>
          </h2>
          <p className={styles.desc}>
            Trackiva's analytics turn your application history into actionable insight. See your conversion funnel, portal performance, and resume effectiveness — all in one place.
          </p>
          <ul className={styles.bulletList}>
            <li>
              <span className={styles.bullet} />
              Know exactly which job portal gives you the most callbacks
            </li>
            <li>
              <span className={styles.bullet} />
              See which resume version gets you to interviews
            </li>
            <li>
              <span className={styles.bullet} />
              Track your application funnel: Applied → Screened → Interview → Offer
            </li>
            <li>
              <span className={styles.bullet} />
              Identify patterns in rejections to improve faster
            </li>
          </ul>
          <a href="#" className={styles.ctaBtn}>
            See Your Analytics
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M8.5 4l4.5 4-4.5 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        <div className={styles.right}>
          {/* Mock Dashboard Card */}
          <div className={styles.dashCard}>
            <div className={styles.dashHeader}>
              <span className={styles.dashTitle}>My Job Hunt Overview</span>
              <span className={styles.dashPeriod}>Last 30 days</span>
            </div>

            <div className={styles.statsGrid}>
              {stats.map((s, i) => (
                <div className={styles.statBox} key={i}>
                  <div className={styles.statValue}>{s.value}</div>
                  <div className={styles.statLabel}>{s.label}</div>
                  <div className={`${styles.statChange} ${s.up ? styles.up : styles.down}`}>
                    ↑ {s.change}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.tableSection}>
              <div className={styles.tableTitle}>Portal Performance</div>
              <div className={styles.tableRows}>
                {portalRows.map((row, i) => (
                  <div className={styles.tableRow} key={i}>
                    <span className={styles.portalName}>{row.name}</span>
                    <span className={styles.portalApps}>{row.apps} apps</span>
                    <div className={styles.barWrap}>
                      <div className={styles.barFill} style={{ width: `${row.bar}%` }} />
                    </div>
                    <span className={styles.portalRate}>{row.rate}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}