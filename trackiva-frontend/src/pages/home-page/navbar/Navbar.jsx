import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../../assets/logo.png";

export default function Navbar() {

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarPill}>

        {/* Logo */}
        <button onClick={() => scrollToSection("home")} className={styles.logo}>
          <img src={logo} alt="Trackiva Logo" />
        </button>

        {/* Nav links */}
        <ul className={styles.navLinks}>
          <li><button onClick={() => scrollToSection("problem")}>Why Trackiva</button></li>
          <li><button onClick={() => scrollToSection("features")}>Features</button></li>
          <li><button onClick={() => scrollToSection("how-it-works")}>How it Works</button></li>
          <li><button onClick={() => scrollToSection("testimonials")}>Reviews</button></li>
        </ul>

        {/* CTA */}
        <Link to="/login" className={styles.ctaBtn}>
          Get Started
        </Link>

      </div>
    </nav>
  );
}