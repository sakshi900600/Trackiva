import React from "react";
import styles from "./Navbar.module.css";
import logo from "../../../assets/logo.png"

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarPill}>

        {/* Logo */}
        <a href="#" className={styles.logo} aria-label="Trackiva home">
          <img src={logo} alt="" />
        </a>

        {/* Nav links — hidden on mobile (≤768 px) */}
        <ul className={styles.navLinks}>
          <li><a href="#" className={styles.active}>Home</a></li>
          <li><a href="#">About us</a></li>
          <li><a href="#">Features</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Find Job</a></li>
        </ul>

        {/* CTA — always visible */}
        <a href="#" className={styles.ctaBtn}>Join With Us</a>

      </div>
    </nav>
  );
}