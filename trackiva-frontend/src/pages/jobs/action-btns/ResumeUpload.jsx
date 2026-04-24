import React, { useState } from "react";
import styles from "./ResumeUpload.module.css";
import { UploadCloud } from "lucide-react";
import { uploadResume } from "../../../api/resume";
import { showSuccess, showError } from "../../../utils/toast";

const ResumeUpload = ({ onUploadSuccess, onClose }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];

    if (selected && selected.type === "application/pdf") {
      setFile(selected);
    } else {
      showError("Please upload a PDF file");
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setLoading(true);

      await uploadResume(file);

      showSuccess("Resume uploaded successfully 🎉");

      setFile(null);

      if (onUploadSuccess) onUploadSuccess();

      // 🔥 CLOSE AFTER SUCCESS
      if (onClose) onClose();

    } catch (err) {
      showError(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h3>Upload Resume</h3>

      <p className={styles.subText}>
        Upload your latest resume (PDF only)
      </p>

      <label className={styles.uploadBox}>
        <UploadCloud size={40} />

        <p className={styles.fileText}>
          {file ? file.name : "Click to upload PDF"}
        </p>

        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          hidden
        />
      </label>

      {file && (
        <button
          className={styles.uploadBtn}
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Resume"}
        </button>
      )}
    </div>
  );
};

export default ResumeUpload;