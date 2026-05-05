import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { resetPassword } from "../../api/auth";
import styles from "./Auth.module.css";
import logo from "../../assets/logo.png";

const friendlyError = (err) => {
  const msg = err?.response?.data?.message || "";

  if (!msg) {
    const status = err?.response?.status;
    if (status === 0 || !status) return "Unable to reach the server. Check your internet connection.";
    if (status >= 500) return "Server error. Please try again later.";
    return "Something went wrong. Please try again.";
  }

  if (msg.includes("invalid or has expired"))
    return "This reset link has expired or already been used. Please request a new one.";
  if (msg.includes("at least 6"))
    return "Password must be at least 6 characters long.";

  return msg.length < 120 ? msg : "Reset failed. Please try again.";
};

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6)
      return setError("Password must be at least 6 characters long.");
    if (password !== confirm)
      return setError("Passwords do not match. Please re-enter.");

    setLoading(true);
    try {
      await resetPassword(token, password);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.cardHeader}>
          <div className={styles.logoWrapper}>
            <img src={logo} alt="Trackiva" className={styles.logo} />
          </div>
          <div className={styles.forgotHeader}>
            <h2 className={styles.forgotTitle}>Set New Password</h2>
            <p className={styles.forgotSubtitle}>
              Choose a strong password for your account
            </p>
          </div>
        </div>

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

        {success ? (
          <div className={styles.successBlock}>
            <div className={styles.successIcon}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <p className={styles.successText}>Password reset successfully!</p>
            <p className={styles.successSub}>Redirecting to login…</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>New Password</label>
              <div className={styles.inputWrapper}>
                <MdLock className={styles.inputIcon} />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
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

            <div className={styles.inputGroup}>
              <label className={styles.label}>Confirm Password</label>
              <div className={styles.inputWrapper}>
                <MdLock className={styles.inputIcon} />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Repeat your password"
                  value={confirm}
                  onChange={(e) => {
                    setConfirm(e.target.value);
                    setError("");
                  }}
                  required
                  className={styles.input}
                />
              </div>
            </div>

            {password && confirm && password !== confirm && (
              <p className={styles.inlineError}>Passwords do not match</p>
            )}

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading || (password !== confirm && confirm.length > 0)}
            >
              {loading ? (
                <>
                  <span className={styles.btnSpinner} /> Resetting…
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;