import React, { useState } from "react";
import styles from "./AddApplication.module.css";
import { showSuccess, showError } from "../../../utils/toast";
import { createJob } from "../../../api/jobs";

const AddApplication = ({ onClose, refreshJobs }) => {
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    company: "",
    role: "",
    platform: "",
    location: "",
    flexibility: "",
    status: "",
    salary: "",
    interviewDate: "",
    contacts: "",
    notes: "",
    appliedDate: today,
    resume: "",
    referral: "",
    coverLetter: "",
    confidence: "",
    skills: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 Convert confidence → score
  const getConfidenceScore = (level) => {
    if (level === "High") return 80;
    if (level === "Medium") return 50;
    if (level === "Low") return 20;
    return 50;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.company || !form.role) {
      showError("Company and Role are required");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        company: form.company,
        role: form.role,
        platform: form.platform,
        location: form.location,

        status: form.status?.toLowerCase() || "applied",

        confidenceScore: getConfidenceScore(form.confidence),

        appliedDate: form.appliedDate,

        notes: form.notes,

        // 🔥 Convert salary string → object
        salary: {
          expected: form.salary
            ? parseInt(form.salary.replace(/\D/g, "")) || 0
            : 0,
        },

        // 🔥 Skills → tags
        tags: form.skills
          ? form.skills.split(",").map((s) => s.trim())
          : [],

        // 🔥 Optional links
        links: {
          referral: form.referral,
        },
      };

      await createJob(payload);

      showSuccess("Application added successfully 🚀");

      // 🔥 Refresh job list
      if (refreshJobs) refreshJobs();

      onClose();
    } catch (err) {
      showError(err.message || "Failed to add job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2>Add New Application</h2>

      {/* Basic Info */}
      <div className={styles.grid}>
        <div className={styles.field}>
          <label>Company *</label>
          <input name="company" onChange={handleChange} />
        </div>

        <div className={styles.field}>
          <label>Role *</label>
          <input name="role" onChange={handleChange} />
        </div>

        <div className={styles.field}>
          <label>Platform</label>
          <input name="platform" onChange={handleChange} />
        </div>

        <div className={styles.field}>
          <label>Location</label>
          <input name="location" onChange={handleChange} />
        </div>
      </div>

      {/* Job Details */}
      <div className={styles.grid}>
        <div className={styles.field}>
          <label>Status</label>
          <select name="status" onChange={handleChange}>
            <option value="">Select</option>
            <option>Applied</option>
            <option>Screening</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
        </div>

        <div className={styles.field}>
          <label>Salary</label>
          <input name="salary" onChange={handleChange} />
        </div>

        <div className={styles.field}>
          <label>Applied Date</label>
          <input
            type="date"
            name="appliedDate"
            value={form.appliedDate}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Extra Info */}
      <div className={styles.grid}>
        <div className={styles.field}>
          <label>Confidence</label>
          <select name="confidence" onChange={handleChange}>
            <option value="">Select</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        <div className={styles.field}>
          <label>Skills</label>
          <input
            name="skills"
            placeholder="React, Node, MongoDB"
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Notes */}
      <div className={styles.field}>
        <label>Notes</label>
        <textarea name="notes" rows={3} onChange={handleChange} />
      </div>

      {/* Buttons */}
      <div className={styles.actions}>
        <button
          type="button"
          onClick={onClose}
          className={styles.cancel}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={styles.submit}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Application"}
        </button>
      </div>
    </form>
  );
};

export default AddApplication;