import React from "react";
import styles from "./Footer.module.css";
import logo from "../../../assets/logo.png";

const links = {
  Product: ["Features", "Analytics", "Notifications", "Resume Tracker", "Roadmap"],
  Company: ["About Us", "Blog", "Careers", "Press"],
  Support: ["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"],
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <a href="#" className={styles.logoWrap} aria-label="Trackiva home">
              <img src={logo} alt="Trackiva logo" className={styles.logoImg} />
            </a>
            <p className={styles.tagline}>
              Trackiva helps job seekers track every application, analyze what's working, and land their dream job faster — no more guessing, no more ghosting chaos.
            </p>
            <div className={styles.socials}>
              <a href="#" className={styles.socialIcon} aria-label="Follow Trackiva on Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Connect with Trackiva on LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Follow Trackiva on Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
            </div>
          </div>

          <div className={styles.linksGroup}>
            {Object.entries(links).map(([group, items]) => (
              <div className={styles.linkCol} key={group}>
                <h4 className={styles.colTitle}>{group}</h4>
                <ul className={styles.colList}>
                  {items.map((item) => (
                    <li key={item}><a href="#" className={styles.colLink}>{item}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <span className={styles.copyright}>
            © {new Date().getFullYear()} Trackiva. Track smarter. Apply better. Get hired faster.
          </span>
          <div className={styles.bottomLinks}>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}