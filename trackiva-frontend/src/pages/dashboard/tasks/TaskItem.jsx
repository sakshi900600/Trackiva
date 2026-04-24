import React, { useEffect, useRef, useState } from "react";
import styles from "./TaskItem.module.css";
import { Pencil, Trash2, Check } from "lucide-react";

const TaskItem = ({ task, toggleTask, deleteTask, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.text);

  const inputRef = useRef(null);

  // Auto focus when editing starts
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
    if (e.key === "Enter") {
      handleSave();
    }
  };

  // Click outside → save + close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        if (isEditing) {
          handleSave();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  });

 

  return (
    <div className={styles.item}>
      {/* Checkbox */}
      <div
        className={`${styles.checkbox} ${
          task.completed ? styles.checked : ""
        }`}
        onClick={toggleTask}
      >
        {task.completed && <Check size={12} />}
      </div>

      {/* TEXT / EDIT */}
      {isEditing ? (
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className={styles.input}
        />
      ) : (
        <p className={task.completed ? styles.completed : ""}>
          {task.text}
        </p>
      )}

      {/* ACTIONS */}
      <div className={styles.actions}>
        {isEditing ? (
          <button className={styles.saveBtn} onClick={handleSave}>
            Save
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)}>
            <Pencil size={14} />
          </button>
        )}

        <button onClick={deleteTask}>
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;