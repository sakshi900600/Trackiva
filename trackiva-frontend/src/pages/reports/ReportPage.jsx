import React, { useState } from "react";
import { submitReport } from "../../api/report";
import styles from "./ReportPage.module.css";

const ReportPage = () => {
  const [reportType, setReportType] = useState("bug");
  const [rating, setRating] = useState(5);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      const payload = {
        reportType,
        description,
        ...(reportType === "review" && { rating }),
      };

      await submitReport(payload);

      setStatus("success");

      // auto reset after 4 sec
      setTimeout(() => {
        setStatus("idle");
        setDescription("");
        setRating(5);
        setReportType("bug");
        setError("");
      }, 4000);
    } catch (err) {
      console.error("Submit error:", err);
      setStatus("idle");
      setError(err.response?.data?.message || "Failed to submit. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className={styles.reportContainer}>
        <div className={styles.successCard}>
          <div className={styles.tickIcon}>✓</div>
          <h2 className={styles.successTitle}>Thank You!</h2>
          <p className={styles.successMessage}>
            {reportType === "bug" && "Thank you for reporting, we will fix the bug soon."}
            {reportType === "review" && "Thank you so much for your review! I hope you are loving Trackiva 🚀✨"}
            {reportType === "feature" && "Great idea! We'll look into adding this feature to Trackiva."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.reportContainer}>
      <header className={styles.header}>
        <h1 className={styles.mainHeading}>Report an Issue</h1>
        <p className={styles.subtitle}>
          Let us know how we can improve your job tracking experience.
        </p>
      </header>

      <div className={styles.formCard}>
        <form onSubmit={handleSubmit} className={styles.reportForm}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Type of Report</label>
            <select
              className={styles.select}
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="bug">Bug Report</option>
              <option value="feature">Feature Request</option>
              <option value="review">Review</option>
            </select>
          </div>

          {reportType === "review" && (
            <div className={styles.formGroup}>
              <label className={styles.label}>Rating</label>
              <div className={styles.ratingGrid}>
                {[5, 4, 3, 2, 1].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setRating(num)}
                    className={`${styles.ratingBtn} ${
                      rating === num ? styles.activeRating : ""
                    }`}
                  >
                    ★ {num}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className={styles.formGroup}>
            <label className={styles.label}>Description</label>
            <textarea
              className={styles.textarea}
              placeholder="Provide as much detail as possible..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {error && <div className={styles.errorMsg}>{error}</div>}

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Submitting..." : "Submit Report"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportPage;