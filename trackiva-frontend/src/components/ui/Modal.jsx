import React, { useEffect } from "react";
import styles from "./Modal.module.css";

const Modal = ({ isOpen, onClose, children }) => {
  // Prevent background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Close on ESC key (pro UX 🔥)
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
      >
        {/* Close Button
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button> */}

        {/* Content */}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;