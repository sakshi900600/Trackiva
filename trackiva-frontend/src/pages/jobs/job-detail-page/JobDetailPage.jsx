import React, { useState } from "react";
import styles from "./JobDetailPage.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useJob } from "../../../hooks/useJob";
import { deleteJob, updateJob } from "../../../api/jobs";
import {
  showSuccess,
  showError,
  showLoading,
  dismissToast,
} from "../../../utils/toast";

import Modal from "../../../components/ui/Modal";
import ApplicationPipeline from "./components/pipeline/ApplicationPipeline";
import JobInfo from "./components/job-info/JobInfo";
import Notes from "./components/notes/Notes";
import Confidence from "./components/confidence/Confidence";
import PlatformCard from "./components/platform/PlatformCard";
import Extras from "./components/extras/Extras";
import LinksCard from "./components/links/LinksCard";
import TagsCard from "./components/tags/TagsCard";
import StatusHistory from "./components/status-history/StatusHistory";

const statusColor = {
  applied: "#6366f1",
  screening: "#f59e0b",
  interview: "#3b82f6",
  offer: "#10b981",
  rejected: "#ef4444",
};

const statusBg = {
  applied: "#eef2ff",
  screening: "#fef3c7",
  interview: "#eff6ff",
  offer: "#ecfdf5",
  rejected: "#fef2f2",
};

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { job, loading, error, refetch } = useJob(id);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const handleDelete = async () => {
    const toastId = showLoading("Deleting job...");
    try {
      await deleteJob(id);
      dismissToast(toastId);
      showSuccess("Job deleted successfully");
      navigate("/jobs");
    } catch (err) {
      dismissToast(toastId);
      showError("Failed to delete job");
    }
  };

  // Backend uses lowercase; pipeline uses lowercase too (after fix)
  const handleStatusChange = async (newStatus) => {
    const toastId = showLoading("Updating status...");
    try {
      await updateJob(id, { status: newStatus });
      dismissToast(toastId);
      showSuccess("Status updated");
      refetch();
    } catch (err) {
      dismissToast(toastId);
      showError("Failed to update status");
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh", flexDirection: "column", gap: 12 }}>
        <div style={{ width: 36, height: 36, border: "3px solid #e2e8f0", borderTop: "3px solid #6366f1", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <p style={{ color: "#64748b", fontSize: 14 }}>Loading job details…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh", flexDirection: "column", gap: 12 }}>
        <p style={{ color: "#ef4444", fontWeight: 600 }}>Failed to load job</p>
        <p style={{ color: "#64748b", fontSize: 13 }}>{error}</p>
        <button onClick={() => navigate("/jobs")} style={{ padding: "8px 16px", background: "#6366f1", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}>
          ← Back to Jobs
        </button>
      </div>
    );
  }

  if (!job) return null;

  return (
    <div className={styles.page}>
      {/* TOP BAR */}
      <div className={styles.topbar}>
        <button className={styles.backBtn} onClick={() => navigate("/jobs")}>
          ← Back to Jobs
        </button>
        <div className={styles.topbarActions}>
          <button className={styles.editBtn}>Edit Job</button>
          <button className={styles.deleteBtn} onClick={() => setDeleteConfirm(true)}>
            Delete
          </button>
        </div>
      </div>

      {/* DELETE MODAL */}
      <Modal isOpen={deleteConfirm} onClose={() => setDeleteConfirm(false)}>
        <h3>Are you sure?</h3>
        <p>This action cannot be undone.</p>
        <button onClick={handleDelete}>Yes, Delete</button>
        <button onClick={() => setDeleteConfirm(false)}>Cancel</button>
      </Modal>

      {/* HERO */}
      <div className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.companyLogo}>{job.company?.charAt(0)}</div>
          <div className={styles.heroInfo}>
            <h1 className={styles.jobTitle}>{job.role}</h1>
            <div className={styles.heroMeta}>
              <span className={styles.companyName}>{job.company}</span>
              <span className={styles.heroDot}>·</span>
              <span className={styles.heroLocation}>{job.location}</span>
            </div>
          </div>
        </div>
        <div className={styles.heroRight}>
          <span
            className={styles.statusBadge}
            style={{
              color: statusColor[job.status] || "#64748b",
              background: statusBg[job.status] || "#f1f5f9",
            }}
          >
            {job.status}
          </span>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className={styles.grid}>
        <div className={styles.left}>
          <ApplicationPipeline
            status={job.status}
            onStatusChange={handleStatusChange}
          />
          <JobInfo job={job} />
          <LinksCard links={job.links} />
          <Notes notes={job.notes} jobId={id} refetch={refetch} />
          <StatusHistory history={job.statusHistory || []} />
        </div>

        <div className={styles.right}>
          <Confidence
            value={job.confidenceScore ?? 0}
            jobId={id}
            refetch={refetch}
          />
          <TagsCard tags={job.tags || []} jobId={id} refetch={refetch} />
          <PlatformCard platform={job.platform} />
          <Extras extras={job.extras} jobId={id} refetch={refetch} />
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;