import React, { useState } from "react";
import styles from "./Notes.module.css";
import { updateJob } from "../../../../../api/jobs";
import { showSuccess, showError, showLoading, dismissToast } from "../../../../../utils/toast";

const Notes = ({ notes, jobId, refetch }) => {
  const [text, setText] = useState(notes || "");
  const [saving, setSaving] = useState(false);
  const isDirty = text !== (notes || "");

  const handleSave = async () => {
    if (!isDirty) return;
    const toastId = showLoading("Saving notes...");
    setSaving(true);
    try {
      await updateJob(jobId, { notes: text });
      dismissToast(toastId);
      showSuccess("Notes saved");
      refetch();
    } catch (err) {
      dismissToast(toastId);
      showError("Failed to save notes");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Notes</h3>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write notes about this job..."
        className={styles.textarea}
        rows={5}
      />
      <button
        onClick={handleSave}
        disabled={!isDirty || saving}
        className={styles.saveBtn}
      >
        {saving ? "Saving..." : "Save Notes"}
      </button>
    </div>
  );
};

export default Notes;