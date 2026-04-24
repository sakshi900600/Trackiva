import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MdEmail, MdLock, MdPerson } from "react-icons/md";
import { login, register } from "../../api/auth";
import styles from "./Auth.module.css";
import logo from "../../assets/trackiva_logo2.png";

const Auth = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  // Tab switch
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError("");
    setFormData({ name: "", email: "", password: "" });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let response;

      if (activeTab === "login") {
        response = await login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        response = await register(formData);
      }

      const token = response?.data?.data?.token;

      if (!token) {
        throw new Error("Token not received");
      }

      // Save token
      localStorage.setItem("token", token);

      // Redirect
      navigate("/");
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.backgroundCircles}>
        {[...Array(15)].map((_, i) => (
          <div key={i} className={styles.smallCircle}></div>
        ))}
      </div>

      <div className={styles.authCard}>
        <div className={styles.cardHeader}>
          <img src={logo} alt="Trackiva Logo" className={styles.logo} />

          <div className={styles.tabContainer}>
            <button
              type="button"
              className={`${styles.tab} ${
                activeTab === "login" ? styles.activeTab : ""
              }`}
              onClick={() => handleTabChange("login")}
            >
              Login
            </button>

            <button
              type="button"
              className={`${styles.tab} ${
                activeTab === "signup" ? styles.activeTab : ""
              }`}
              onClick={() => handleTabChange("signup")}
            >
              Sign Up
            </button>

            <div
              className={`${styles.slider} ${
                activeTab === "signup" ? styles.sliderRight : ""
              }`}
            />
          </div>
        </div>

        {error && <div className={styles.errorAlert}>{error}</div>}

        <button type="button" className={styles.googleBtn}>
          <FcGoogle size={20} />
          Continue with Google
        </button>

        <div className={styles.divider}>
          <span>OR</span>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {activeTab === "signup" && (
            <div className={styles.inputGroup}>
              <label className={styles.label}>Full Name</label>
              <div className={styles.inputWrapper}>
                <MdPerson className={styles.inputIcon} />
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>
            </div>
          )}

          <div className={styles.inputGroup}>
            <label className={styles.label}>Email Address</label>
            <div className={styles.inputWrapper}>
              <MdEmail className={styles.inputIcon} />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <div className={styles.inputWrapper}>
              <MdLock className={styles.inputIcon} />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
          </div>

          {activeTab === "login" && (
            <div className={styles.forgotPassword}>
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
          )}

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : activeTab === "login"
              ? "Login"
              : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;