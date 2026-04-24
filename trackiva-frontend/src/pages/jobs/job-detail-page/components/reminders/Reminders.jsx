import React, { useState } from "react";
import styles from "./Reminders.module.css";

const Reminders = ({ reminders, setReminders }) => {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");

  // Add Reminder
  const handleAdd = () => {
    if (!text.trim()) return;

    const newReminder = {
      id: Date.now().toString(),
      text,
      date,
      completed: false,
    };

    setReminders((prev) => [newReminder, ...prev]);
    setText("");
    setDate("");
  };

  // Toggle Complete
  const toggleComplete = (id) => {
    setReminders((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // Delete
  const handleDelete = (id) => {
    setReminders((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Reminders & Follow-ups</h3>

      {/* Add Section */}
      <div className={styles.addSection}>
        <input
          type="text"
          placeholder="Add reminder..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={styles.input}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={styles.dateInput}
        />

        <button className={styles.addBtn} onClick={handleAdd}>
          Add
        </button>
      </div>

      {/* List */}
      <div className={styles.list}>
        {reminders.length === 0 && (
          <p className={styles.empty}>No reminders yet</p>
        )}

        {reminders.map((item) => (
          <div
            key={item.id}
            className={`${styles.item} ${
              item.completed ? styles.completed : ""
            }`}
          >
            <div className={styles.left}>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleComplete(item.id)}
              />

              <div>
                <p className={styles.text}>{item.text}</p>
                {item.date && (
                  <span className={styles.date}>{item.date}</span>
                )}
              </div>
            </div>

            <button
              className={styles.deleteBtn}
              onClick={() => handleDelete(item.id)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reminders;