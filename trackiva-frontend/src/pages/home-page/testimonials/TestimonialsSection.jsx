import React from "react";
import styles from "./TestimonialsSection.module.css";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Software Engineer — Got hired at Razorpay",
    avatar: "PS",
    avatarColor: "#7C3AED",
    quote: "I used to forget companies that had reached out. With Trackiva, I had full context for every call. I got my offer in 6 weeks flat.",
    stars: 5,
  },
  {
    name: "Arjun Mehta",
    role: "Product Manager — Joined a Series B startup",
    avatar: "AM",
    avatarColor: "#0ea5e9",
    quote: "The analytics blew my mind. I was spending 70% of time on Indeed with a 10% response rate. Switched to direct applications — response rate jumped to 55%.",
    stars: 5,
  },
  {
    name: "Sneha Reddy",
    role: "UI/UX Designer — Landed remote role",
    avatar: "SR",
    avatarColor: "#10b981",
    quote: "The reminder system is underrated. Interview date reminders, follow-up nudges — I never missed a step again. It genuinely felt like having a job search manager.",
    stars: 5,
  },
  {
    name: "Karan Patel",
    role: "Data Analyst — Switched industries successfully",
    avatar: "KP",
    avatarColor: "#f59e0b",
    quote: "Trackiva showed me that my Resume v3 had a 3x higher callback rate than v1. That single insight changed everything about how I approached applications.",
    stars: 5,
  },
];

function Stars({ count }) {
  return (
    <div className={styles.stars}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#f59e0b">
          <path d="M7 1l1.55 3.14L12 4.63l-2.5 2.44.59 3.44L7 8.77l-3.09 1.74.59-3.44L2 4.63l3.45-.49L7 1z"/>
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Real Stories</span>
          <h2 className={styles.title}>
            Job Seekers Who <span className={styles.accent}>Cracked It</span>
          </h2>
          <p className={styles.subtitle}>
            From frustration to offer letters — real people, real results.
          </p>
        </div>

        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <div className={styles.card} key={i}>
              <Stars count={t.stars} />
              <p className={styles.quote}>"{t.quote}"</p>
              <div className={styles.author}>
                <div className={styles.avatar} style={{ background: t.avatarColor }}>
                  {t.avatar}
                </div>
                <div>
                  <div className={styles.authorName}>{t.name}</div>
                  <div className={styles.authorRole}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}