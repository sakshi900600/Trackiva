import React, { useState } from "react";
import styles from "./JobDetailPage.module.css";
import dummyJobDetail from "./data/dummyJobDetail";

import ApplicationPipeline from "./components/pipeline/ApplicationPipeline";
import JobInfo from "./components/job-info/JobInfo";
import Notes from "./components/notes/Notes";
import Reminders from "./components/reminders/Reminders";
import Confidence from "./components/confidence/Confidence";
import PlatformCard from "./components/platform/PlatformCard";
import Contacts from "./components/contacts/Contacts";
import QuickActions from "./components/quick-actions/QuickActions";
import ResumeSection from "./components/resume/ResumeSection";
import Extras from "./components/extras/Extras";
import LinksCard from "./components/links/LinksCard";
import TagsCard from "./components/tags/TagsCard";
import StatusHistory from "./components/status-history/StatusHistory";

const JobDetailPage = () => {
  const [job, setJob] = useState(dummyJobDetail);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const statusColor = {
    Applied: "#6366f1",
    Screening: "#f59e0b",
    Interview: "#3b82f6",
    Offer: "#10b981",
    Rejected: "#ef4444",
  };
  const statusBg = {
    Applied: "#eef2ff",
    Screening: "#fef3c7",
    Interview: "#eff6ff",
    Offer: "#ecfdf5",
    Rejected: "#fef2f2",
  };

  return (
    <div className={styles.page}>
      {/* TOP BAR */}
      <div className={styles.topbar}>
        <button className={styles.backBtn}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Jobs
        </button>
        <div className={styles.topbarActions}>
          <button className={styles.editBtn}>Edit Job</button>
          {!deleteConfirm ? (
            <button className={styles.deleteBtn} onClick={() => setDeleteConfirm(true)}>
              Delete
            </button>
          ) : (
            <div className={styles.confirmRow}>
              <span className={styles.confirmText}>Sure?</span>
              <button className={styles.confirmYes}>Yes, delete</button>
              <button className={styles.confirmNo} onClick={() => setDeleteConfirm(false)}>Cancel</button>
            </div>
          )}
        </div>
      </div>

      {/* HERO HEADER */}
      <div className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.companyLogo}>
            {job.company.charAt(0)}
          </div>
          <div className={styles.heroInfo}>
            <h1 className={styles.jobTitle}>{job.title}</h1>
            <div className={styles.heroMeta}>
              <span className={styles.companyName}>{job.company}</span>
              <span className={styles.heroDot}>·</span>
              <span className={styles.heroLocation}>{job.jobInfo.location}</span>
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
        {/* LEFT COLUMN */}
        <div className={styles.left}>
          <ApplicationPipeline
            status={job.status}
            onStatusChange={(newStatus) =>
              setJob((prev) => ({
                ...prev,
                status: newStatus,
                statusHistory: [
                  ...prev.statusHistory,
                  { status: newStatus, date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) },
                ],
              }))
            }
          />

          <JobInfo jobInfo={job.jobInfo} />

          <LinksCard links={job.links} />

          <Notes
            notes={job.notes}
            setNotes={(notes) => setJob((prev) => ({ ...prev, notes }))}
          />

          <Reminders
            reminders={job.reminders}
            setReminders={(reminders) => setJob((prev) => ({ ...prev, reminders }))}
          />

          <StatusHistory history={job.statusHistory} />
        </div>

        {/* RIGHT COLUMN */}
        <div className={styles.right}>
          <Confidence
            value={job.confidence}
            setValue={(val) => setJob((prev) => ({ ...prev, confidence: val }))}
          />

          <TagsCard
            tags={job.tags}
            setTags={(tags) => setJob((prev) => ({ ...prev, tags }))}
          />

          <PlatformCard platform={job.platform} />

          <ResumeSection resume={job.resume} />

          <Contacts
            contacts={job.contacts}
            setContacts={(contacts) => setJob((prev) => ({ ...prev, contacts }))}
          />

          <QuickActions job={job} />

          <Extras
            extras={job.extras}
            setExtras={(extras) => setJob((prev) => ({ ...prev, extras }))}
          />
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;