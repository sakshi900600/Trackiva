import React, { useState } from "react";
import styles from "./AddApplication.module.css";
import { showSuccess, showError, showLoading, dismissToast } from "../../../utils/toast";
import { createJob } from "../../../api/jobs";

const AddApplication = ({ onClose, refreshJobs }) => {
  const today = new Date().toISOString().split("T")[0];
  const [fetchingUrl, setFetchingUrl] = useState(false);
  const [jobUrl, setJobUrl] = useState("");

  const [form, setForm] = useState({
    company: "", role: "", platform: "", platformUrl: "",
    location: "", status: "applied", salary: "",
    appliedDate: today, confidence: "Medium",
    tags: "", notes: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Auto-fill: parse what we can from the URL domain as platform,
  // and use Claude API to extract job details from the page text
  const handleAutoFill = async () => {
    if (!jobUrl.trim()) return showError("Please enter a job URL first");
    setFetchingUrl(true);
    const toastId = showLoading("Extracting job details…");
    try {
      // Derive platform from URL
      let detectedPlatform = "";
      let detectedPlatformUrl = "";
      try {
        const u = new URL(jobUrl);
        const host = u.hostname.replace("www.", "");
        detectedPlatformUrl = u.origin;
        const platformMap = { "linkedin.com": "LinkedIn", "naukri.com": "Naukri", "indeed.com": "Indeed", "glassdoor.com": "Glassdoor", "internshala.com": "Internshala", "wellfound.com": "Wellfound", "unstop.com": "Unstop", "hirist.tech": "Hirist" };
        detectedPlatform = platformMap[host] || host.split(".")[0].charAt(0).toUpperCase() + host.split(".")[0].slice(1);
      } catch {}

      // Call our backend proxy which fetches + parses the page
      // If you don't have this route yet, fall back to just filling platform
      let extracted = {};
      try {
        const res = await fetch(`/api/jobs/extract-url?url=${encodeURIComponent(jobUrl)}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (res.ok) extracted = (await res.json()).data || {};
      } catch {}

      setForm(prev => ({
        ...prev,
        platform: extracted.platform || detectedPlatform || prev.platform,
        platformUrl: extracted.platformUrl || detectedPlatformUrl || prev.platformUrl,
        company: extracted.company || prev.company,
        role: extracted.role || prev.role,
        location: extracted.location || prev.location,
        salary: extracted.salary || prev.salary,
        tags: extracted.tags ? extracted.tags.join(", ") : prev.tags,
      }));
      dismissToast(toastId);
      showSuccess(extracted.company ? "Details extracted! Review and save." : "Platform detected — fill in remaining details.");
    } catch (err) {
      dismissToast(toastId);
      showError("Could not extract details");
    } finally { setFetchingUrl(false); }
  };

  const getConfidenceScore = (level) => ({ High: 80, Medium: 50, Low: 20 }[level] ?? 50);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.company || !form.role || !form.platform) return showError("Company, Role and Platform are required");
    setLoading(true);
    try {
      await createJob({
        company: form.company, role: form.role,
        platform: form.platform, platformUrl: form.platformUrl,
        location: form.location,
        status: form.status?.toLowerCase() || "applied",
        confidenceScore: getConfidenceScore(form.confidence),
        appliedDate: form.appliedDate,
        salary: { expected: parseInt(form.salary.replace(/\D/g, "")) || 0 },
        tags: form.tags ? form.tags.split(",").map(s => s.trim()).filter(Boolean) : [],
        notes: [],
        links: jobUrl ? [{ label: "Job Posting", url: jobUrl }] : [],
      });
      showSuccess("Application added 🚀");
      if (refreshJobs) refreshJobs();
      onClose();
    } catch (err) {
      showError(err.message || "Failed to add job");
    } finally { setLoading(false); }
  };

  return (
    <div className={styles.container}>
      <div className={styles.modalHeader}>
        <h2 className={styles.modalTitle}>Add New Application</h2>
        <button className={styles.closeBtn} onClick={onClose}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      {/* Auto-fill from URL */}
      <div className={styles.autoFillSection}>
        <p className={styles.autoFillLabel}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          Auto-fill from job URL
        </p>
        <div className={styles.autoFillRow}>
          <input
            className={styles.urlInput}
            placeholder="Paste job posting URL…"
            value={jobUrl}
            onChange={e => setJobUrl(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleAutoFill()}
          />
          <button className={styles.autoFillBtn} onClick={handleAutoFill} disabled={fetchingUrl || !jobUrl.trim()}>
            {fetchingUrl ? (
              <><span className={styles.miniSpinner} /> Fetching…</>
            ) : (
              <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
              </svg> Auto-fill</>
            )}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.section}>
          <p className={styles.sectionLabel}>Basic Info</p>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Company *</label>
              <input name="company" value={form.company} onChange={handleChange} placeholder="e.g. Google" />
            </div>
            <div className={styles.field}>
              <label>Role *</label>
              <input name="role" value={form.role} onChange={handleChange} placeholder="e.g. Software Engineer" />
            </div>
            <div className={styles.field}>
              <label>Platform *</label>
              <input name="platform" value={form.platform} onChange={handleChange} placeholder="e.g. LinkedIn" />
            </div>
            <div className={styles.field}>
              <label>Location</label>
              <input name="location" value={form.location} onChange={handleChange} placeholder="e.g. Bangalore or Remote" />
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <p className={styles.sectionLabel}>Details</p>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="applied">Applied</option>
                <option value="screening">Screening</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className={styles.field}>
              <label>Expected Salary</label>
              <input name="salary" value={form.salary} onChange={handleChange} placeholder="e.g. 1200000" />
            </div>
            <div className={styles.field}>
              <label>Applied Date</label>
              <input type="date" name="appliedDate" value={form.appliedDate} onChange={handleChange} />
            </div>
            <div className={styles.field}>
              <label>Confidence</label>
              <select name="confidence" value={form.confidence} onChange={handleChange}>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <p className={styles.sectionLabel}>Tags</p>
          <div className={styles.field}>
            <label>Skills / Tags</label>
            <input name="tags" value={form.tags} onChange={handleChange} placeholder="React, Node.js, TypeScript (comma-separated)" />
          </div>
        </div>

        <div className={styles.actions}>
          <button type="button" onClick={onClose} className={styles.cancel}>Cancel</button>
          <button type="submit" className={styles.submit} disabled={loading}>
            {loading ? "Saving…" : "Save Application"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddApplication;