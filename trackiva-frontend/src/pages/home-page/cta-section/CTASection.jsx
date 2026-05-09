import React from "react";
import { Link } from "react-router-dom";
import styles from "./CTASection.module.css";

export default function CTASection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.bgGlow} />

        <span className={styles.eyebrow}>Get Started Free</span>

        <h2 className={styles.title}>
          Your Dream Job Is
          <br />
          <span className={styles.accent}>One Decision Away</span>
        </h2>

        <p className={styles.subtitle}>
          Stop applying into the void. Start tracking, analyzing, and winning.
          <br />
          Join thousands of job seekers who found clarity with Trackiva.
        </p>

        {/* CTA Buttons */}
        <div className={styles.actions}>

          {/* Primary CTA */}
          <Link to="/login" className={styles.btnPrimary}>
            Start Tracking — It's Free

            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M8.5 4l4.5 4-4.5 4"
                stroke="white"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          {/* Demo CTA */}
          <a href="https://drive.google.com/drive/folders/1sOnlqDxoP7rl_awXYAWnAbLLF85bY6zD?usp=sharing"
            className={styles.btnGhost}
            
          >
            Watch Demo
          </a>

        </div>

        {/* Trust indicators */}
        <div className={styles.trustRow}>
          <span className={styles.trustItem}>
            ✓ No credit card required
          </span>

          <span className={styles.trustDot} />

          <span className={styles.trustItem}>
            ✓ Free forever plan
          </span>

          <span className={styles.trustDot} />

          <span className={styles.trustItem}>
            ✓ Setup in 2 minutes
          </span>
        </div>
      </div>
    </section>
  );
}