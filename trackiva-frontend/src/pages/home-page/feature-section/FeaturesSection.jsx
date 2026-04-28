import React from "react";
import styles from "./FeaturesSection.module.css";

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.10)",
    tag: "Core",
    title: "One-Click Job Logging",
    desc: "Log any job application in seconds. Capture role, company, portal, date, and salary — all from one simple form.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <polyline points="12 6 12 12 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    color: "#0ea5e9",
    bg: "rgba(14,165,233,0.10)",
    tag: "Tracking",
    title: "Real-Time Status Board",
    desc: "Visual kanban-style board. Move applications from Applied → Interview → Offer → Rejected. See everything at a glance.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    color: "#10b981",
    bg: "rgba(16,185,129,0.10)",
    tag: "Analytics",
    title: "Deep Performance Analytics",
    desc: "Which resume gets callbacks? Which portal converts best? Trackiva crunches your data so you can optimize your strategy.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.10)",
    tag: "Reminders",
    title: "Smart Notifications",
    desc: "Get pinged for follow-ups, interview prep, deadline reminders. Never let an opportunity slip through the cracks again.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    color: "#ec4899",
    bg: "rgba(236,72,153,0.10)",
    tag: "Resumes",
    title: "Resume Version Tracking",
    desc: "Tag each application with the exact resume version you used. Identify which version gets you to the interview stage.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    color: "#6366f1",
    bg: "rgba(99,102,241,0.10)",
    tag: "Insights",
    title: "Portal Performance Score",
    desc: "LinkedIn, Indeed, Naukri — see your response rate per platform. Focus your energy where it actually pays off.",
  },
];

export default function FeaturesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Everything You Need</span>
          <h2 className={styles.title}>
            Built for the <span className={styles.accent}>Modern Job Seeker</span>
          </h2>
          <p className={styles.subtitle}>
            Not just a tracker. A strategic co-pilot for your entire job hunt.
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((f, i) => (
            <div className={styles.card} key={i}>
              <div className={styles.cardTop}>
                <div className={styles.iconWrap} style={{ background: f.bg, color: f.color }}>
                  {f.icon}
                </div>
                <span className={styles.tag} style={{ color: f.color, background: f.bg }}>{f.tag}</span>
              </div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}