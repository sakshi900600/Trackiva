import React, { useState, useCallback } from "react";
import styles from "./JobDetailPage.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useJob } from "../../../hooks/useJob";
import { deleteJob, updateJob } from "../../../api/jobs";
import { showSuccess, showError, showLoading, dismissToast } from "../../../utils/toast";

import ApplicationPipeline from "./components/pipeline/ApplicationPipeline";
import JobInfo from "./components/job-info/JobInfo";
import Notes from "./components/notes/Notes";
import Confidence from "./components/confidence/Confidence";
import PlatformCard from "./components/platform/PlatformCard";
import Extras from "./components/extras/Extras";
import LinksCard from "./components/links/LinksCard";
import TagsCard from "./components/tags/TagsCard";
import StatusHistory from "./components/status-history/StatusHistory";
import QuickActions from "./components/quick-actions/QuickActions";
import Contacts from "./components/contacts/Contacts";
import Reminders from "./components/reminders/Reminders";
import ResumeSection from "./components/resume/ResumeSection";

const statusColor = {
  applied: "#6366f1", screening: "#f59e0b", interview: "#3b82f6",
  offer: "#10b981", rejected: "#ef4444",
};
const statusBg = {
  applied: "#eef2ff", screening: "#fef3c7", interview: "#eff6ff",
  offer: "#ecfdf5", rejected: "#fef2f2",
};

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { job, setJob, loading, error, refetch } = useJob(id);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  // ── Optimistic update helper ───────────────────────────
  // Updates local state immediately, then syncs with server in background.
  // Only calls refetch() on error to restore correct state.
  const optimisticUpdate = useCallback((updater) => {
    setJob(prev => prev ? { ...prev, ...updater(prev) } : prev);
  }, [setJob]);

  const handleDelete = async () => {
    const toastId = showLoading("Deleting job...");
    try {
      await deleteJob(id);
      dismissToast(toastId);
      showSuccess("Job deleted successfully");
      navigate("/jobs");
    } catch {
      dismissToast(toastId);
      showError("Failed to delete job");
    }
  };

  const handleStatusChange = async (newStatus) => {
    // Optimistically update status + statusHistory immediately
    optimisticUpdate(prev => ({
      status: newStatus,
      statusHistory: [...(prev.statusHistory || []), { status: newStatus, date: new Date().toISOString() }],
    }));
    const toastId = showLoading("Updating status...");
    try {
      await updateJob(id, { status: newStatus });
      dismissToast(toastId);
      showSuccess("Status updated");
    } catch {
      dismissToast(toastId);
      showError("Failed to update status");
      refetch(); // restore on error
    }
  };

  if (loading) return (
    <div className={styles.centered}>
      <div className={styles.spinner} />
      <p className={styles.loadingText}>Loading job details…</p>
    </div>
  );

  if (error) return (
    <div className={styles.centered}>
      <p className={styles.errorTitle}>Failed to load job</p>
      <p className={styles.errorMsg}>{error}</p>
      <button onClick={() => navigate("/jobs")} className={styles.backBtnAlt}>← Back to Jobs</button>
    </div>
  );

  if (!job) return null;

  return (
    <div className={styles.page}>
      {/* TOP BAR */}
      <div className={styles.topbar}>
        <button className={styles.backBtn} onClick={() => navigate("/jobs")}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Back to Jobs
        </button>
        <div className={styles.topbarActions}>
          <button className={styles.deleteBtn} onClick={() => setDeleteConfirm(true)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
            </svg>
            Delete
          </button>
        </div>
      </div>

      {/* DELETE MODAL */}
      {deleteConfirm && (
        <div className={styles.modalOverlay} onClick={() => setDeleteConfirm(false)}>
          <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalIcon}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <h3 className={styles.modalTitle}>Delete this job?</h3>
            <p className={styles.modalDesc}>This will permanently remove <strong>{job.role}</strong> at <strong>{job.company}</strong>. This action cannot be undone.</p>
            <div className={styles.modalActions}>
              <button className={styles.modalCancel} onClick={() => setDeleteConfirm(false)}>Cancel</button>
              <button className={styles.modalDelete} onClick={handleDelete}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* HERO */}
      <div className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.companyLogo}>{job.company?.charAt(0)?.toUpperCase()}</div>
          <div className={styles.heroInfo}>
            <h1 className={styles.jobTitle}>{job.role}</h1>
            <div className={styles.heroMeta}>
              <span className={styles.companyName}>{job.company}</span>
              {job.location && <><span className={styles.heroDot}>·</span><span className={styles.heroLocation}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display:"inline",marginRight:3}}>
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                {job.location}
              </span></>}
            </div>
          </div>
        </div>
        <span className={styles.statusBadge} style={{ color: statusColor[job.status] || "#64748b", background: statusBg[job.status] || "#f1f5f9" }}>
          {job.status}
        </span>
      </div>

      {/* MAIN GRID */}
      <div className={styles.grid}>
        <div className={styles.left}>
          <ApplicationPipeline status={job.status} onStatusChange={handleStatusChange} />
          <JobInfo job={job} jobId={id} optimisticUpdate={optimisticUpdate} refetch={refetch} />
          <Notes notes={job.notes || []} jobId={id} optimisticUpdate={optimisticUpdate} refetch={refetch} />
          <Contacts contacts={job.contacts || []} jobId={id} optimisticUpdate={optimisticUpdate} refetch={refetch} />
          <LinksCard links={job.links} jobId={id} optimisticUpdate={optimisticUpdate} refetch={refetch} />
          <Confidence value={job.confidenceScore ?? 0} jobId={id} optimisticUpdate={optimisticUpdate} refetch={refetch} />
          <StatusHistory history={job.statusHistory || []} />
        </div>
        <div className={styles.right}>
          <QuickActions job={job} />
          <ResumeSection resume={job.resume} jobId={id} optimisticUpdate={optimisticUpdate} refetch={refetch} />
          <Reminders reminders={job.reminders || []} jobId={id} optimisticUpdate={optimisticUpdate} refetch={refetch} />
          <TagsCard tags={job.tags || []} jobId={id} optimisticUpdate={optimisticUpdate} refetch={refetch} />
          <PlatformCard platform={job.platform} platformUrl={job.platformUrl} />
          <Extras extras={job.extras} jobId={id} refetch={refetch} />
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;