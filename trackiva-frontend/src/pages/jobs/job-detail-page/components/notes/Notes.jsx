import React, { useState } from "react";
import styles from "./Notes.module.css";

const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric",
    });
  } catch {
    return "";
  }
};

const Notes = ({ notes, setNotes }) => {
  const [newNote, setNewNote] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleAdd = () => {
    if (!newNote.trim()) return;
    setNotes((prev) => [
      { id: Date.now().toString(), text: newNote.trim(), createdAt: new Date().toISOString() },
      ...prev,
    ]);
    setNewNote("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleAdd();
  };

  const handleDelete = (id) => setNotes((prev) => prev.filter((n) => n.id !== id));

  const handleEdit = (note) => {
    setEditingId(note.id);
    setEditingText(note.text);
  };

  const handleSave = (id) => {
    if (!editingText.trim()) return;
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, text: editingText.trim() } : n))
    );
    setEditingId(null);
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>Notes</h3>
        {notes.length > 0 && (
          <span className={styles.count}>{notes.length}</span>
        )}
      </div>

      {/* Add Note */}
      <div className={styles.addSection}>
        <textarea
          className={styles.textarea}
          placeholder="Write a note… (Ctrl+Enter to save)"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={3}
        />
        <div className={styles.addRow}>
          <span className={styles.hint}>Ctrl + Enter to save</span>
          <button
            className={styles.addBtn}
            onClick={handleAdd}
            disabled={!newNote.trim()}
          >
            Add Note
          </button>
        </div>
      </div>

      {/* Notes List */}
      {notes.length > 0 && (
        <div className={styles.list}>
          {notes.map((note) => (
            <div key={note.id} className={styles.noteItem}>
              {editingId === note.id ? (
                <div className={styles.editMode}>
                  <textarea
                    className={styles.textarea}
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    rows={3}
                    autoFocus
                  />
                  <div className={styles.editActions}>
                    <button className={styles.saveBtn} onClick={() => handleSave(note.id)}>
                      Save
                    </button>
                    <button className={styles.cancelBtn} onClick={() => setEditingId(null)}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className={styles.noteText}>{note.text}</p>
                  <div className={styles.noteMeta}>
                    <span className={styles.noteDate}>{formatDate(note.createdAt)}</span>
                    <div className={styles.noteActions}>
                      <button className={styles.editBtn} onClick={() => handleEdit(note)}>
                        Edit
                      </button>
                      <button className={styles.deleteBtn} onClick={() => handleDelete(note.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {notes.length === 0 && (
        <p className={styles.empty}>No notes yet. Add one above.</p>
      )}
    </div>
  );
};

export default Notes;