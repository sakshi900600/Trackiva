import React, { useState } from "react";
import styles from "./ActionButtons.module.css";
import { Upload, Plus } from "lucide-react";

import Modal from "../../../components/ui/Modal";
import ResumeUpload from "./ResumeUpload";
import AddApplication from "./AddApplication";

const ActionButtons = ({ refreshJobs, refreshResumes }) => {
  const [openResumeModal, setOpenResumeModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);

  return (
    <>
      <div className={styles.container}>
        {/* Add New Application */}
        <button
          className={styles.primaryBtn}
          onClick={() => setOpenAddModal(true)}
        >
          <Plus size={18} /> Add New Application
        </button>

        {/* Upload Resume */}
        <button
          className={styles.secondaryBtn}
          onClick={() => setOpenResumeModal(true)}
        >
          <Upload size={18} />
          <span>Upload Resume</span>
        </button>
      </div>

      {/* 🔥 Resume Modal */}
      <Modal
        isOpen={openResumeModal}
        onClose={() => setOpenResumeModal(false)}
      >
        <ResumeUpload
          onClose={() => setOpenResumeModal(false)}        // ✅ FIX
          onUploadSuccess={refreshResumes}                 // optional
        />
      </Modal>

      {/* 🔥 Add Job Modal */}
      <Modal
        isOpen={openAddModal}
        onClose={() => setOpenAddModal(false)}
      >
        <AddApplication
          onClose={() => setOpenAddModal(false)}
          refreshJobs={refreshJobs}                        // optional
        />
      </Modal>
    </>
  );
};

export default ActionButtons;