import React, { useEffect, useState } from "react";
import styles from "./InterviewPrepPage.module.css";
import { useNavigate } from "react-router-dom";

import {
  getQAs,
  createQA,
  updateQA,
  deleteQA,
} from "../../../api/interview";

import Modal from "../../../components/ui/Modal";

import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

import {
  showSuccess,
  showError,
  showLoading,
  dismissToast,
} from "../../../utils/toast";

const InterviewPrepPage = () => {
  const navigate = useNavigate();

  const [qas, setQAs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openId, setOpenId] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const [editingQA, setEditingQA] = useState(null);

  const [form, setForm] = useState({
    question: "",
    answer: "",
    category: "other",
  });

  // Fetch
  const fetchQAs = async () => {
    try {
      setLoading(true);
      const res = await getQAs();
      setQAs(res?.data || []);
    } catch {
      showError("Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQAs();
  }, []);

  // Add
  const handleAdd = () => {
    setEditingQA(null);
    setForm({ question: "", answer: "", category: "other" });
    setOpenModal(true);
  };

  // Edit
  const handleEdit = (qa) => {
    setEditingQA(qa);
    setForm({
      question: qa.question,
      answer: qa.answer || "",
      category: qa.category,
    });
    setOpenModal(true);
  };

  // Save
  const handleSave = async () => {
    if (!form.question.trim()) return showError("Question required");

    const t = showLoading("Saving...");

    try {
      if (editingQA) {
        const res = await updateQA(editingQA._id, form);
        setQAs((prev) =>
          prev.map((q) => (q._id === editingQA._id ? res.data : q))
        );
        showSuccess("Updated");
      } else {
        const res = await createQA(form);
        setQAs((prev) => [res.data, ...prev]);
        showSuccess("Created");
      }

      setOpenModal(false);
    } catch {
      showError("Error");
    } finally {
      dismissToast(t);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    const t = showLoading("Deleting...");
    try {
      await deleteQA(id);
      setQAs((prev) => prev.filter((q) => q._id !== id));
      showSuccess("Deleted");
    } catch {
      showError("Error");
    } finally {
      dismissToast(t);
    }
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
        <div className={styles.header}>
          <h1 className={styles.title}>Interview Preparation</h1>

          <button className={styles.addBtn} onClick={handleAdd}>
            <Plus size={20} />
            Add Question
          </button>
        </div>

        {/* List */}
        {loading ? (
          <div className={styles.placeholder}>Loading...</div>
        ) : qas.length === 0 ? (
          <div className={styles.placeholder}>
            No questions yet
          </div>
        ) : (
          <div className={styles.list}>
            {qas.map((qa) => (
              <div
                key={qa._id}
                className={`${styles.card} ${
                  openId === qa._id ? styles.activeCard : ""
                }`}
              >
                {/* Question Row */}
                <div
                  className={styles.row}
                  onClick={() =>
                    setOpenId(openId === qa._id ? null : qa._id)
                  }
                >
                  <div className={styles.left}>
                    <span className={styles.question}>
                      {qa.question}
                    </span>

                    <span
                      className={`${styles.tag} ${styles[qa.category]}`}
                    >
                      {qa.category}
                    </span>
                  </div>

                  <div className={styles.actions}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(qa);
                      }}
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      className={styles.delete}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(qa._id);
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Answer */}
                {openId === qa._id && (
                  <div className={styles.answer}>
                    {qa.answer || "No answer added yet"}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
          <div className={styles.modalForm}>
            <h2>{editingQA ? "Edit Question" : "Add Question"}</h2>

            <input
              placeholder="Question"
              value={form.question}
              onChange={(e) =>
                setForm({ ...form, question: e.target.value })
              }
            />

            <textarea
              placeholder="Answer"
              value={form.answer}
              onChange={(e) =>
                setForm({ ...form, answer: e.target.value })
              }
            />

            <select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            >
              <option value="hr">HR</option>
              <option value="behavioral">Behavioral</option>
              <option value="technical">Technical</option>
              <option value="other">Other</option>
            </select>

            <button className={styles.saveBtn} onClick={handleSave}>
              Save
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default InterviewPrepPage;