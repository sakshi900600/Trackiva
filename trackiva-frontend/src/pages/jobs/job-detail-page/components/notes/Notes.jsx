import React, { useState } from "react";
import styles from "./Notes.module.css";

const Notes = ({ notes, setNotes }) => {
  const [newNote, setNewNote] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Add Note
  const handleAddNote = () => {
    if (!newNote.trim()) return;

    const note = {
      id: Date.now().toString(),
      text: newNote,
      createdAt: new Date().toISOString(),
    };

    setNotes((prev) => [note, ...prev]);
    setNewNote("");
  };

  // Delete Note
  const handleDelete = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  // Start Editing
  const handleEdit = (note) => {
    setEditingId(note.id);
    setEditingText(note.text);
  };

  // Save Edit
  const handleSave = (id) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, text: editingText } : note
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Notes</h3>

      {/* Add Note */}
      <div className={styles.addSection}>
        <textarea
          className={styles.textarea}
          placeholder="Write a note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button className={styles.addBtn} onClick={handleAddNote}>
          Add
        </button>
      </div>

      {/* Notes List */}
      <div className={styles.list}>
        {notes.length === 0 && (
          <p className={styles.empty}>No notes yet</p>
        )}

        {notes.map((note) => (
          <div key={note.id} className={styles.noteItem}>
            {editingId === note.id ? (
              <>
                <textarea
                  className={styles.textarea}
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <div className={styles.actions}>
                  <button
                    className={styles.saveBtn}
                    onClick={() => handleSave(note.id)}
                  >
                    Save
                  </button>
                  <button
                    className={styles.cancelBtn}
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className={styles.noteText}>{note.text}</p>

                <div className={styles.actions}>
                  <button
                    className={styles.editBtn}
                    onClick={() => handleEdit(note)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(note.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;