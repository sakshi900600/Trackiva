import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdEmail, MdLock, MdPerson, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { GoogleLogin } from "@react-oauth/google";
import { login, register, forgotPassword, googleAuth } from "../../api/auth";
import styles from "./Auth.module.css";
import logo from "../../assets/logo.png";

// Simple client-side email format check (server does deep validation)
const isValidEmailFormat = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Map known server error messages to user-friendly ones
const friendlyError = (err) => {
  const msg = err?.response?.data?.message || "";

  if (!msg) {
    const status = err?.response?.status;
    if (status === 0 || !status) return "Unable to reach the server. Check your internet connection.";
    if (status === 429) return "Too many attempts. Please wait a few minutes and try again.";
    if (status >= 500) return "Server error. Please try again later.";
    return "Something went wrong. Please try again.";
  }

  // Auth errors
  if (msg.includes("Google Sign-In") && msg.includes("log in")) return "This email is linked to a Google account. Please use the 'Continue with Google' button instead.";
  if (msg.includes("Invalid credentials")) return "Incorrect email or password. Please try again.";
  if (msg.includes("already exists")) return "An account with this email already exists. Try logging in instead.";
  if (msg.includes("Google Sign-In")) return "This account was created with Google. Please use the 'Continue with Google' button.";
  if (msg.includes("Disposable email")) return "Please use a real email address. Disposable emails are not allowed.";
  if (msg.includes("Invalid email format")) return "Please enter a valid email address.";
  if (msg.includes("Email domain")) return "This email domain doesn't seem valid. Please use a different email.";
  if (msg.includes("Password must be at least")) return "Password must be at least 6 characters long.";
  if (msg.includes("Name is required")) return "Please enter your full name.";

  // Google auth
  if (msg.includes("Google login failed") || msg.includes("Google auth failed"))
    return "Google sign-in failed. Please try again or use email/password instead.";

  // Fallback — return the server message directly if it's readable
  return msg.length < 120 ? msg : "Something went wrong. Please try again.";
};

const Auth = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login"); // "login" | "signup" | "forgot"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
    if (successMsg) setSuccessMsg("");
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError("");
    setSuccessMsg("");
    setFormData({ name: "", email: "", password: "" });
    setShowPass(false);
  };

  const handleAuthSuccess = (token) => {
    localStorage.setItem("token", token);
    window.location.href = "/dashboard";
  };

  const handleGoogleLogin = async (credential) => {
    try {
      setLoading(true);
      setError("");
      const res = await googleAuth(credential);
      const token = res?.data?.data?.token;
      if (!token) throw new Error("Authentication failed");
      handleAuthSuccess(token);
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setLoading(false);
    }
  };

  // ── Submit login / signup ──────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!isValidEmailFormat(formData.email)) {
      return setError("Please enter a valid email address.");
    }

    if (activeTab === "signup" && !formData.name?.trim()) {
      return setError("Please enter your full name.");
    }

    if (formData.password.length < 6) {
      return setError("Password must be at least 6 characters long.");
    }

    setLoading(true);
    try {
      const response =
        activeTab === "login"
          ? await login({ email: formData.email, password: formData.password })
          : await register(formData);

      const token = response?.data?.data?.token;
      if (!token) throw new Error("Authentication failed");
      handleAuthSuccess(token);
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setLoading(false);
    }
  };

  // ── Submit forgot password ─────────────────────────────
  const handleForgot = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!isValidEmailFormat(formData.email)) {
      return setError("Please enter a valid email address.");
    }

    setLoading(true);
    try {
      await forgotPassword(formData.email);
      setSuccessMsg(
        "If that email is registered, you'll receive a reset link shortly. Check your spam folder too."
      );
      setFormData((p) => ({ ...p, email: "" }));
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>

        {/* Header */}
        <div className={styles.cardHeader}>
          <div
            className={styles.logoWrapper}
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            <img src={logo} alt="Trackiva" className={styles.logo} />
          </div>

          {activeTab !== "forgot" && (
            <div className={styles.tabContainer}>
              <button
                className={`${styles.tab} ${activeTab === "login" ? styles.activeTab : ""}`}
                onClick={() => handleTabChange("login")}
              >
                Login
              </button>
              <button
                className={`${styles.tab} ${activeTab === "signup" ? styles.activeTab : ""}`}
                onClick={() => handleTabChange("signup")}
              >
                Sign Up
              </button>
              <div
                className={`${styles.slider} ${activeTab === "signup" ? styles.sliderRight : ""}`}
              />
            </div>
          )}

          {activeTab === "forgot" && (
            <div className={styles.forgotHeader}>
              <h2 className={styles.forgotTitle}>Reset Password</h2>
              <p className={styles.forgotSubtitle}>
                Enter your email and we'll send a reset link
              </p>
            </div>
          )}
        </div>

        {/* Alerts */}
        {error && (
          <div className={styles.errorAlert}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </div>
        )}
        {successMsg && (
          <div className={styles.successAlert}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            {successMsg}
          </div>
        )}

        {/* Google login — only on login/signup tabs */}
        {activeTab !== "forgot" && (
          <>
            <div className={styles.googleWrapper}>
              <GoogleLogin
                onSuccess={(res) => {
                  if (!res.credential) return;
                  handleGoogleLogin(res.credential);
                }}
                onError={() => setError("Google sign-in failed. Please try again or use email/password instead.")}
              />
            </div>
            <div className={styles.divider}>
              <span>OR</span>
            </div>
          </>
        )}

        {/* ── Login / Signup form ── */}
        {activeTab !== "forgot" && (
          <form onSubmit={handleSubmit} className={styles.form}>
            {activeTab === "signup" && (
              <div className={styles.inputGroup}>
                <label className={styles.label}>Full Name</label>
                <div className={styles.inputWrapper}>
                  <MdPerson className={styles.inputIcon} />
                  <input
                    type="text"
                    name="name"
                    placeholder="Your full name"
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
                  placeholder="you@example.com"
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
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder={activeTab === "signup" ? "Min. 6 characters" : "Your password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPass((p) => !p)}
                  tabIndex={-1}
                >
                  {showPass ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
                </button>
              </div>
            </div>

            {activeTab === "login" && (
              <div className={styles.forgotRow}>
                <button
                  type="button"
                  className={styles.forgotLink}
                  onClick={() => handleTabChange("forgot")}
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? (
                <>
                  <span className={styles.btnSpinner} /> Processing…
                </>
              ) : activeTab === "login" ? (
                "Login"
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        )}

        {/* ── Forgot password form ── */}
        {activeTab === "forgot" && (
          <form onSubmit={handleForgot} className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Email Address</label>
              <div className={styles.inputWrapper}>
                <MdEmail className={styles.inputIcon} />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? (
                <>
                  <span className={styles.btnSpinner} /> Sending…
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>

            <button
              type="button"
              className={styles.backToLogin}
              onClick={() => handleTabChange("login")}
            >
              ← Back to Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;