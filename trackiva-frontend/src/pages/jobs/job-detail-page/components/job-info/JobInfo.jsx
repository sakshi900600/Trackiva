import React, { useState } from "react";
import styles from "./JobInfo.module.css";
import { updateJob } from "../../../../../api/jobs";
import { showSuccess, showError, showLoading, dismissToast } from "../../../../../utils/toast";

const formatDate = (date) => {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const JobInfo = ({ job, jobId, refetch }) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    location: job.location || "",
    expectedSalary: job.salary?.expected || "",
    offeredSalary: job.salary?.offered || "",
    appliedDate: job.appliedDate ? job.appliedDate.split("T")[0] : "",
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    const toastId = showLoading("Updating job info...");
    setSaving(true);
    try {
      await updateJob(jobId, {
        location: form.location,
        salary: { expected: Number(form.expectedSalary) || 0, offered: Number(form.offeredSalary) || 0 },
        appliedDate: form.appliedDate ? new Date(form.appliedDate) : job.appliedDate,
      });
      dismissToast(toastId);
      showSuccess("Job info updated");
      setEditing(false);
      refetch();
    } catch {
      dismissToast(toastId);
      showError("Failed to update job info");
    } finally { setSaving(false); }
  };

  const fields = [
    {
      label: "Location", value: job.location || "—", icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z"/><circle cx="12" cy="10" r="3"/>
        </svg>
      ), colorClass: styles.blue,
    },
    {
      label: "Expected Salary", value: job.salary?.expected ? `₹${job.salary.expected.toLocaleString()}` : "—", icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
        </svg>
      ), colorClass: styles.green,
    },
    {
      label: "Offered Salary", value: job.salary?.offered ? `₹${job.salary.offered.toLocaleString()}` : "—", icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
        </svg>
      ), colorClass: styles.purple,
    },
    {
      label: "Applied Date", value: formatDate(job.appliedDate), icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      ), colorClass: styles.orange,
    },
    {
      label: "Last Updated", value: formatDate(job.updatedAt), icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
        </svg>
      ), colorClass: styles.gray,
    },
  ];

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>Job Details</h3>
        {!editing ? (
          <button className={styles.editBtn} onClick={() => setEditing(true)}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Edit
          </button>
        ) : (
          <div className={styles.headerActions}>
            <button className={styles.cancelBtn} onClick={() => setEditing(false)}>Cancel</button>
            <button className={styles.saveBtn} onClick={handleSave} disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        )}
      </div>

      {editing ? (
        <div className={styles.editGrid}>
          <div className={styles.editField}>
            <label className={styles.editLabel}>Location</label>
            <input className={styles.input} value={form.location} onChange={e => setForm(p => ({...p, location: e.target.value}))} placeholder="City, State or Remote" />
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel}>Expected Salary (₹)</label>
            <input className={styles.input} type="number" value={form.expectedSalary} onChange={e => setForm(p => ({...p, expectedSalary: e.target.value}))} placeholder="0" />
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel}>Offered Salary (₹)</label>
            <input className={styles.input} type="number" value={form.offeredSalary} onChange={e => setForm(p => ({...p, offeredSalary: e.target.value}))} placeholder="0" />
          </div>
          <div className={styles.editField}>
            <label className={styles.editLabel}>Applied Date</label>
            <input className={styles.input} type="date" value={form.appliedDate} onChange={e => setForm(p => ({...p, appliedDate: e.target.value}))} />
          </div>
        </div>
      ) : (
        <div className={styles.grid}>
          {fields.map((f) => (
            <div key={f.label} className={styles.item}>
              <div className={`${styles.iconBox} ${f.colorClass}`}>{f.icon}</div>
              <div>
                <p className={styles.label}>{f.label}</p>
                <p className={styles.value}>{f.value}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobInfo;