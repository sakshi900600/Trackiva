import React, { useState, useEffect } from "react";
import styles from "./ResumeSection.module.css";
import { updateJob } from "../../../../../api/jobs";
import { showSuccess, showError, showLoading, dismissToast } from "../../../../../utils/toast";
import axiosInstance from "../../../../../api/axiosInstance";

const ResumeSection = ({ resume, jobId, optimisticUpdate, refetch }) => {
  // resume comes directly from job.resume — { name, url, uploadedAt }
  const hasResume = !!resume?.name;
  const [mode, setMode] = useState(null); // null | "upload" | "select"
  const [savedResumes, setSavedResumes] = useState([]);
  const [loadingResumes, setLoadingResumes] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (mode === "select") fetchResumes();
  }, [mode]);

  const fetchResumes = async () => {
    setLoadingResumes(true);
    try {
      const res = await axiosInstance.get("/resume");
      // Handle both array and paginated responses
      const data = res.data?.data;
      setSavedResumes(Array.isArray(data) ? data : data?.resumes || []);
    } catch {
      setSavedResumes([]);
    } finally { setLoadingResumes(false); }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const resumeData = {
      name: file.name,
      url: "",
      uploadedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };

    // Optimistic update
    optimisticUpdate(() => ({ resume: resumeData }));
    setMode(null);
    const toastId = showLoading("Attaching resume...");
    setSaving(true);
    try {
      await updateJob(jobId, { resume: resumeData });
      dismissToast(toastId); showSuccess("Resume attached");
    } catch {
      optimisticUpdate(() => ({ resume: resume })); // rollback
      dismissToast(toastId); showError("Failed to attach resume");
      refetch();
    } finally { setSaving(false); }
  };

  const handleSelectSaved = async (r) => {
    const resumeData = {
      name: r.originalName || r.filename || r.name,
      url: r.url || r.fileUrl || "",
      uploadedAt: r.uploadedAt || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };

    // Optimistic update
    optimisticUpdate(() => ({ resume: resumeData }));
    setMode(null);
    const toastId = showLoading("Attaching resume...");
    setSaving(true);
    try {
      await updateJob(jobId, { resume: resumeData });
      dismissToast(toastId); showSuccess("Resume attached");
    } catch {
      optimisticUpdate(() => ({ resume: resume })); // rollback
      dismissToast(toastId); showError("Failed to attach");
      refetch();
    } finally { setSaving(false); }
  };

  const handleRemove = async () => {
    const prev = resume;
    const empty = { name: "", url: "", uploadedAt: "" };

    // Optimistic remove
    optimisticUpdate(() => ({ resume: empty }));
    const toastId = showLoading("Removing...");
    try {
      await updateJob(jobId, { resume: empty });
      dismissToast(toastId); showSuccess("Resume removed");
    } catch {
      optimisticUpdate(() => ({ resume: prev })); // rollback
      dismissToast(toastId); showError("Failed to remove");
      refetch();
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.iconBox}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
        </div>
        <h3 className={styles.title}>Resume</h3>
      </div>

      {/* ── Resume attached ── */}
      {hasResume && (
        <div className={styles.fileBox}>
          <div className={styles.fileIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
          </div>
          <div className={styles.fileMeta}>
            <p className={styles.fileName}>{resume.name}</p>
            {resume.uploadedAt && <p className={styles.fileDate}>Attached {resume.uploadedAt}</p>}
          </div>
          <div className={styles.fileActions}>
            {resume.url && (
              <a href={resume.url} target="_blank" rel="noopener noreferrer" className={styles.viewBtn}>View</a>
            )}
            <button className={styles.replaceBtn} onClick={() => setMode(mode ? null : "select")}>Change</button>
            <button className={styles.removeBtn} onClick={handleRemove} title="Remove" disabled={saving}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ── No resume — choose action ── */}
      {!hasResume && mode === null && (
        <div className={styles.actions}>
          <button className={styles.uploadBtn} onClick={() => setMode("upload")}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            Upload New
          </button>
          <button className={styles.selectBtn} onClick={() => setMode("select")}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
            </svg>
            My Resumes
          </button>
        </div>
      )}

      {/* ── Upload panel ── */}
      {mode === "upload" && (
        <div className={styles.panel}>
          <label className={styles.dropZone}>
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} className={styles.fileInput} />
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            <p className={styles.dropText}>Click to browse</p>
            <p className={styles.dropSub}>PDF, DOC, DOCX</p>
          </label>
          <div className={styles.panelFooter}>
            <button className={styles.cancelPanelBtn} onClick={() => setMode(null)}>Cancel</button>
            <button className={styles.switchBtn} onClick={() => setMode("select")}>Select from my resumes →</button>
          </div>
        </div>
      )}

      {/* ── Select saved resume panel ── */}
      {mode === "select" && (
        <div className={styles.panel}>
          <p className={styles.panelLabel}>Your uploaded resumes</p>
          {loadingResumes ? (
            <p className={styles.loadingText}>Loading…</p>
          ) : savedResumes.length === 0 ? (
            <div className={styles.noResumes}>
              <p>No resumes found in your library.</p>
              <button className={styles.switchBtn} onClick={() => setMode("upload")}>Upload one now →</button>
            </div>
          ) : (
            <div className={styles.savedList}>
              {savedResumes.map((r) => (
                <button key={r._id || r.id} className={styles.savedItem} onClick={() => handleSelectSaved(r)}>
                  <div className={styles.savedIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                  </div>
                  <div className={styles.savedMeta}>
                    <span className={styles.savedName}>{r.originalName || r.filename || r.name}</span>
                    <span className={styles.savedDate}>{r.uploadedAt || ""}</span>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
              ))}
            </div>
          )}
          <div className={styles.panelFooter}>
            <button className={styles.cancelPanelBtn} onClick={() => setMode(null)}>Cancel</button>
            <button className={styles.switchBtn} onClick={() => setMode("upload")}>Upload new →</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeSection;