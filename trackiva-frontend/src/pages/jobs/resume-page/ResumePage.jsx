import React, { useEffect, useState } from "react";
import styles from "./ResumePage.module.css";
import { useNavigate } from "react-router-dom";

import {
  getResumes,
  deleteResume,
  renameResume,
} from "../../../api/resume";

import ResumeUpload from "../action-btns/ResumeUpload";
import Modal from "../../../components/ui/Modal";

import {
  ArrowLeft,
  Upload,
  Pencil,
  Trash2,
  Eye,
  Check,
  X,
  RefreshCcw,
} from "lucide-react";

const ResumePage = () => {
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openUpload, setOpenUpload] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState("");
  const [selectedResume, setSelectedResume] = useState(null);

  // ✅ Fetch
  const fetchResumes = async () => {
    try {
      setLoading(true);
      const res = await getResumes();
      setResumes(res?.data || res || []);
    } catch (err) {
      console.error(err);
      setResumes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  // ✅ Delete
  const handleDelete = async (id) => {
    await deleteResume(id);
    setResumes((prev) => prev.filter((r) => r._id !== id));

    if (selectedResume?._id === id) {
      setSelectedResume(null);
    }
  };

  // ✅ Rename
  const handleRename = async (id) => {
    if (!newName.trim()) return;

    const res = await renameResume(id, newName);

    setResumes((prev) =>
      prev.map((r) => (r._id === id ? res?.data || res : r))
    );

    setEditingId(null);
    setNewName("");
  };

  return (
    <div className={styles.container}>
      {/* Back */}
      <button onClick={() => navigate("/jobs")} className={styles.backBtn}>
        <ArrowLeft size={18} />
        Back to Jobs
      </button>

      <div className={styles.wrapper}>
        {/* Header */}

<div className={styles.topSection}>
  <h1 className={styles.title}>My Resumes</h1>

  <div className={styles.headerActions}>
    <button className={styles.refreshBtn} onClick={fetchResumes}>
      <RefreshCcw size={18} />
    </button>

    <button
      className={styles.uploadBtn}
      onClick={() => setOpenUpload(true)}
    >
      <Upload size={18} />
      <span className={styles.btnText}>Upload</span>
    </button>
  </div>
</div>

        {/* Upload Modal */}
        <Modal isOpen={openUpload} onClose={() => setOpenUpload(false)}>
          <ResumeUpload
            onSuccess={async () => {
              setOpenUpload(false);
              await fetchResumes();

              setTimeout(() => {
                fetchResumes();
              }, 800);
            }}
          />
        </Modal>

        {/* LIST */}
        {loading ? (
          <div className={styles.placeholderBox}>
            Loading resumes...
          </div>
        ) : resumes.length === 0 ? (
          <div className={styles.placeholderBox}>
            No resumes uploaded yet 📄
          </div>
        ) : (
          <div className={styles.list}>
            {resumes.map((resume) => (
              <div
                key={resume._id}
                className={`${styles.row} ${
                  selectedResume?._id === resume._id
                    ? styles.activeRow
                    : ""
                }`}
                onClick={() => setSelectedResume(resume)}
              >
                <div className={styles.left}>
                  {editingId === resume._id ? (
                    <input
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className={styles.input}
                      autoFocus
                    />
                  ) : (
                    <span className={styles.name}>{resume.name}</span>
                  )}
                </div>

                <div className={styles.actions}>
                  <a
                    href={`http://localhost:5000${resume.fileUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Eye size={18} />
                  </a>

                  {editingId === resume._id ? (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRename(resume._id);
                        }}
                      >
                        <Check size={18} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingId(null);
                          setNewName("");
                        }}
                      >
                        <X size={18} />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingId(resume._id);
                        setNewName(resume.name);
                      }}
                    >
                      <Pencil size={18} />
                    </button>
                  )}

                  <button
                    className={styles.delete}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(resume._id);
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PREVIEW */}
        <div className={styles.previewSection}>
          {selectedResume ? (
            <iframe
              title="resume-preview"
              src={`http://localhost:5000${selectedResume.fileUrl}`}
              className={styles.previewFrame}
            />
          ) : (
            <div className={styles.placeholderBox}>
              Select a resume to preview 👆
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumePage;