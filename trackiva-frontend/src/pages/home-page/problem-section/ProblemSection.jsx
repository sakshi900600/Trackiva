import React from "react";
import styles from "./ProblemSection.module.css";

const problems = [
  {
    emoji: "😶",
    title: "Applied & Forgotten",
    desc: "You apply to 20 jobs this week. A month later, a recruiter calls — and you have zero idea if it's legit or which role it even is.",
  },
  {
    emoji: "👻",
    title: "Ghosted With No Closure",
    desc: "No rejection email, no update. Just silence. You don't know if you should follow up or move on.",
  },
  {
    emoji: "🤷",
    title: "No Idea What's Working",
    desc: "Is your resume the problem? The platform? The role title? Without data, you're just guessing every single time.",
  },
  {
    emoji: "📅",
    title: "Missed Interviews & Deadlines",
    desc: "Interview prep reminders buried in your calendar. Follow-up tasks forgotten. The chaos costs you opportunities.",
  },
];

export default function ProblemSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>The Job Search Struggle</span>
          <h2 className={styles.title}>
            Sound <span className={styles.accent}>Familiar?</span>
          </h2>
          <p className={styles.subtitle}>
            Every job seeker hits these walls. Trackiva was built because we lived through every one of them.
          </p>
        </div>

        <div className={styles.grid}>
          {problems.map((p, i) => (
            <div className={styles.card} key={i}>
              <div className={styles.cardEmoji}>{p.emoji}</div>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardDesc}>{p.desc}</p>
              <div className={styles.cardLine} />
            </div>
          ))}
        </div>

        <div className={styles.bridge}>
          <div className={styles.bridgeLine} />
          <span className={styles.bridgeText}>Trackiva fixes all of this</span>
          <div className={styles.bridgeLine} />
        </div>
      </div>
    </section>
  );
}