import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdEmail, MdLock, MdPerson } from "react-icons/md";
import { GoogleLogin } from "@react-oauth/google";
import { login, register } from "../../api/auth";
import styles from "./Auth.module.css";
import logo from "../../assets/logo.png";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError("");
    setFormData({ name: "", email: "", password: "" });
  };

  const handleAuthSuccess = (token) => {
    localStorage.setItem("token", token);
    window.location.href = "/dashboard";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = activeTab === "login" 
        ? await login({ email: formData.email, password: formData.password })
        : await register(formData);

      const token = response?.data?.data?.token;
      if (!token) throw new Error("Authentication failed");
      handleAuthSuccess(token);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.cardHeader}>
          {/* Logo Container for better control */}
          <div className={styles.logoWrapper}>
            <img src={logo} alt="Logo" className={styles.logo} />
          </div>

          <div className={styles.tabContainer}>
            <button
              className={`${styles.tab} ${activeTab === "login" ? styles.activeTab : ""}`}
              onClick={() => handleTabChange("login")}
            >Login</button>
            <button
              className={`${styles.tab} ${activeTab === "signup" ? styles.activeTab : ""}`}
              onClick={() => handleTabChange("signup")}
            >Sign Up</button>
            <div className={`${styles.slider} ${activeTab === "signup" ? styles.sliderRight : ""}`} />
          </div>
        </div>

        {error && <div className={styles.errorAlert}>{error}</div>}

        <div className={styles.googleWrapper}>
          <GoogleLogin
            onSuccess={(res) => handleAuthSuccess(res.credential)}
            onError={() => setError("Google login failed")}
          />
        </div>

        <div className={styles.divider}><span>OR</span></div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {activeTab === "signup" && (
            <div className={styles.inputGroup}>
              <label className={styles.label}>Full Name</label>
              <div className={styles.inputWrapper}>
                <MdPerson className={styles.inputIcon} />
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className={styles.input} />
              </div>
            </div>
          )}

          <div className={styles.inputGroup}>
            <label className={styles.label}>Email Address</label>
            <div className={styles.inputWrapper}>
              <MdEmail className={styles.inputIcon} />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className={styles.input} />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <div className={styles.inputWrapper}>
              <MdLock className={styles.inputIcon} />
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className={styles.input} />
            </div>
          </div>

          {activeTab === "login" && (
            <div className={styles.forgotPassword}>
              <Link to="">Forgot password?</Link>
            </div>
          )}

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "Processing..." : activeTab === "login" ? "Login" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;