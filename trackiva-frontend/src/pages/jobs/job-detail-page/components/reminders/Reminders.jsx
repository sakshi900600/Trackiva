import React, { useState } from "react";
import styles from "./Reminders.module.css";

const isOverdue = (dateStr) => {
  if (!dateStr) return false;
  return new Date(dateStr) < new Date(new Date().toDateString());
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric",
    });
  } catch { return dateStr; }
};

const Reminders = ({ reminders, setReminders }) => {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;
    setReminders((prev) => [
      { id: Date.now().toString(), text: text.trim(), date, completed: false },
      ...prev,
    ]);
    setText("");
    setDate("");
  };

  const toggleComplete = (id) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r))
    );
  };

  const handleDelete = (id) => setReminders((prev) => prev.filter((r) => r.id !== id));

  const pending = reminders.filter((r) => !r.completed);
  const done = reminders.filter((r) => r.completed);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>Reminders & Follow-ups</h3>
        {pending.length > 0 && (
          <span className={styles.badge}>{pending.length} pending</span>
        )}
      </div>

      {/* Add */}
      <div className={styles.addSection}>
        <input
          type="text"
          placeholder="Add a reminder…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          className={styles.input}
        />
        <div className={styles.addRow}>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={styles.dateInput}
          />
          <button className={styles.addBtn} onClick={handleAdd} disabled={!text.trim()}>
            Add
          </button>
        </div>
      </div>

      {/* Pending */}
      {pending.length > 0 && (
        <div className={styles.list}>
          {pending.map((item) => (
            <div
              key={item.id}
              className={`${styles.item} ${isOverdue(item.date) ? styles.overdue : ""}`}
            >
              <div className={styles.itemLeft}>
                <button
                  className={styles.checkbox}
                  onClick={() => toggleComplete(item.id)}
                  aria-label="Complete"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
                <div>
                  <p className={styles.itemText}>{item.text}</p>
                  {item.date && (
                    <span className={`${styles.itemDate} ${isOverdue(item.date) ? styles.overdueDate : ""}`}>
                      {isOverdue(item.date) ? "⚠ Overdue · " : "📅 "}
                      {formatDate(item.date)}
                    </span>
                  )}
                </div>
              </div>
              <button className={styles.deleteBtn} onClick={() => handleDelete(item.id)}>✕</button>
            </div>
          ))}
        </div>
      )}

      {/* Done */}
      {done.length > 0 && (
        <div className={styles.doneSection}>
          <p className={styles.doneLabel}>Completed ({done.length})</p>
          {done.map((item) => (
            <div key={item.id} className={`${styles.item} ${styles.completed}`}>
              <div className={styles.itemLeft}>
                <button
                  className={`${styles.checkbox} ${styles.checked}`}
                  onClick={() => toggleComplete(item.id)}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
                <p className={styles.itemTextDone}>{item.text}</p>
              </div>
              <button className={styles.deleteBtn} onClick={() => handleDelete(item.id)}>✕</button>
            </div>
          ))}
        </div>
      )}

      {reminders.length === 0 && (
        <p className={styles.empty}>No reminders yet</p>
      )}
    </div>
  );
};

export default Reminders;