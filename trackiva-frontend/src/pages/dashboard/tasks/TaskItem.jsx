import React, { useEffect, useRef, useState } from "react";
import styles from "./TaskItem.module.css";
import { Pencil, Trash2, Check } from "lucide-react";

const TaskItem = ({ task, toggleTask, deleteTask, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (value.trim() && value !== task.text) {
      editTask(task._id, value);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") setIsEditing(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        if (isEditing) handleSave();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <div className={`${styles.item} ${task.completed ? styles.itemDone : ""}`}>
      {/* Checkbox */}
      <div
        className={`${styles.checkbox} ${task.completed ? styles.checked : ""}`}
        onClick={toggleTask}
      >
        {task.completed && <Check size={11} strokeWidth={3} />}
      </div>

      {/* Text / Edit input */}
      <div className={styles.textWrap}>
        {isEditing ? (
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={styles.editInput}
          />
        ) : (
          <p className={`${styles.text} ${task.completed ? styles.completed : ""}`}>
            {task.text}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        {isEditing ? (
          <button className={styles.saveBtn} onClick={handleSave}>
            Save
          </button>
        ) : (
          <button className={styles.iconBtn} onClick={() => setIsEditing(true)}>
            <Pencil size={13} />
          </button>
        )}
        <button className={`${styles.iconBtn} ${styles.deleteBtn}`} onClick={deleteTask}>
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;