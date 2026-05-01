import React from "react";
import styles from "./Hero.module.css";
import Navbar from "../navbar/Navbar";
import HeroContent from "../hero-content/HeroContent";

export default function Hero() {
  return (
    <section className={styles.heroSection}>
      {/* Hex SVG pattern background */}
      <div className={styles.bgPattern}>
        <svg
          width="100%" height="70%"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="hexGrid" x="0" y="0" width="62" height="54" patternUnits="userSpaceOnUse">
              <polygon
                points="31,2 60,18 60,50 31,66 2,50 2,18"
                fill="none" stroke="rgba(109,40,217,0.12)" strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexGrid)" />
        </svg>
      </div>

      {/* Corner spotlights */}
      <div className={styles.spotlightLeft} />
      <div className={styles.spotlightRight} />

      <Navbar />
      <HeroContent />

      
    </section>
  );
}