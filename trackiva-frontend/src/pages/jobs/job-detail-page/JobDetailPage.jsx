import React, { useState } from "react";
import styles from "./JobDetailPage.module.css";

// Dummy Data
import dummyJobDetail from "./data/dummyJobDetail";

// Components
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

const JobDetailPage = () => {
  const [job, setJob] = useState(dummyJobDetail);

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <button className={styles.backBtn}>← Back to Jobs</button>

        <div className={styles.headerContent}>
          <div>
            <h1 className={styles.title}>{job.title}</h1>
            <p className={styles.company}>{job.company}</p>
          </div>

          <button className={styles.deleteBtn}>Delete</button>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className={styles.grid}>
        {/* LEFT */}
        <div className={styles.left}>
          <ApplicationPipeline
            status={job.status}
            onStatusChange={(newStatus) =>
              setJob((prev) => ({ ...prev, status: newStatus }))
            }
          />

          <JobInfo jobInfo={job.jobInfo} />

          <Notes
            notes={job.notes}
            setNotes={(notes) =>
              setJob((prev) => ({ ...prev, notes }))
            }
          />

          <Reminders
            reminders={job.reminders}
            setReminders={(reminders) =>
              setJob((prev) => ({ ...prev, reminders }))
            }
          />
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <Confidence
            value={job.confidence}
            setValue={(val) =>
              setJob((prev) => ({ ...prev, confidence: val }))
            }
          />

          <PlatformCard platform={job.platform} />

          <Contacts
            contacts={job.contacts}
            setContacts={(contacts) =>
              setJob((prev) => ({ ...prev, contacts }))
            }
          />

          <QuickActions />

          <ResumeSection resume={job.resume} />

          <Extras
            extras={job.extras}
            setExtras={(extras) =>
              setJob((prev) => ({ ...prev, extras }))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;