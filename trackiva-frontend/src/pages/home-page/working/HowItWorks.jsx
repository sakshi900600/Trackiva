import React from "react";
import styles from "./HowItWorks.module.css";

const steps = [
  {
    number: "01",
    title: "Log Your Applications",
    desc: "Every time you apply, add it to Trackiva in under 10 seconds. Company, role, portal, resume version, date — captured cleanly.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4v10M14 14l-4-4M14 14l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="4" y="18" width="20" height="6" rx="2" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    number: "02",
    title: "Track Every Status Update",
    desc: "Got an email? Move it forward. Got rejected? Log it. Built-in status pipeline keeps your entire hunt organized and visible.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M9 14l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: "03",
    title: "Analyze & Optimize",
    desc: "Review your analytics dashboard. See what's working, fix what isn't. Make smarter decisions with every application you send.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 22L10 14l5 4 5-8 4 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Simple Process</span>
          <h2 className={styles.title}>
            How <span className={styles.accent}>Trackiva</span> Works
          </h2>
          <p className={styles.subtitle}>
            Three steps. Zero complexity. A completely new relationship with your job search.
          </p>
        </div>

        <div className={styles.stepsRow}>
          {steps.map((s, i) => (
            <React.Fragment key={i}>
              <div className={styles.stepCard}>
                <div className={styles.stepNumber}>{s.number}</div>
                <div className={styles.stepIconWrap}>{s.icon}</div>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className={styles.connector}>
                  <svg width="40" height="16" viewBox="0 0 40 16" fill="none">
                    <path d="M0 8h36M30 2l8 6-8 6" stroke="#c4b5fd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}