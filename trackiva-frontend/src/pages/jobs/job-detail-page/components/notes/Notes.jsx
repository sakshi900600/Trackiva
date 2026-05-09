import React, { useState } from "react";
import styles from "./Notes.module.css";
import { addNote, updateNote, deleteNote } from "../../../../../api/jobs";
import { showSuccess, showError, showLoading, dismissToast } from "../../../../../utils/toast";

const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

const formatDate = (d) => {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
};

const Notes = ({ notes = [], jobId, optimisticUpdate, refetch }) => {
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAdd = async () => {
    if (!text.trim()) return;
    const tempId = uid();
    const newNote = { id: tempId, text: text.trim(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };

    // Optimistic: add immediately
    optimisticUpdate(prev => ({ notes: [...(prev.notes || []), newNote] }));
    setText("");
    setSaving(true);
    const toastId = showLoading("Adding note...");
    try {
      const res = await addNote(jobId, newNote.text);
      // Replace with real data from server
      const realNotes = res.data?.data?.notes;
      if (realNotes) optimisticUpdate(() => ({ notes: realNotes }));
      dismissToast(toastId);
      showSuccess("Note added");
    } catch {
      // Rollback
      optimisticUpdate(prev => ({ notes: (prev.notes || []).filter(n => n.id !== tempId) }));
      dismissToast(toastId);
      showError("Failed to add note");
      refetch();
    } finally { setSaving(false); }
  };

  const handleUpdate = async (noteId) => {
    if (!editText.trim()) return;
    const prev_text = notes.find(n => n.id === noteId)?.text;

    // Optimistic update
    optimisticUpdate(prev => ({
      notes: (prev.notes || []).map(n => n.id === noteId ? { ...n, text: editText.trim(), updatedAt: new Date().toISOString() } : n)
    }));
    setEditingId(null);
    const toastId = showLoading("Updating note...");
    try {
      const res = await updateNote(jobId, noteId, editText.trim());
      const realNotes = res.data?.data?.notes;
      if (realNotes) optimisticUpdate(() => ({ notes: realNotes }));
      dismissToast(toastId);
      showSuccess("Note updated");
    } catch {
      // Rollback
      optimisticUpdate(prev => ({
        notes: (prev.notes || []).map(n => n.id === noteId ? { ...n, text: prev_text } : n)
      }));
      dismissToast(toastId);
      showError("Failed to update note");
      refetch();
    }
  };

  const handleDelete = async (noteId) => {
    const deletedNote = notes.find(n => n.id === noteId);

    // Optimistic delete
    optimisticUpdate(prev => ({ notes: (prev.notes || []).filter(n => n.id !== noteId) }));
    const toastId = showLoading("Deleting note...");
    try {
      await deleteNote(jobId, noteId);
      dismissToast(toastId);
      showSuccess("Note deleted");
    } catch {
      // Rollback
      optimisticUpdate(prev => ({ notes: [...(prev.notes || []), deletedNote] }));
      dismissToast(toastId);
      showError("Failed to delete note");
      refetch();
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.iconBox}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
          </div>
          <h3 className={styles.title}>Notes</h3>
        </div>
        {notes.length > 0 && <span className={styles.count}>{notes.length}</span>}
      </div>

      <div className={styles.addSection}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a note about this job…"
          className={styles.textarea}
          rows={3}
          onKeyDown={(e) => { if (e.key === "Enter" && e.ctrlKey) handleAdd(); }}
        />
        <div className={styles.addRow}>
          <span className={styles.hint}>Ctrl+Enter to save</span>
          <button onClick={handleAdd} disabled={!text.trim() || saving} className={styles.addBtn}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Note
          </button>
        </div>
      </div>

      {notes.length === 0 ? (
        <p className={styles.empty}>No notes yet — add your first one above</p>
      ) : (
        <div className={styles.list}>
          {[...notes].reverse().map((note) => (
            <div key={note.id} className={styles.noteItem}>
              {editingId === note.id ? (
                <div className={styles.editMode}>
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className={styles.textarea}
                    rows={3}
                    autoFocus
                  />
                  <div className={styles.editActions}>
                    <button className={styles.cancelBtn} onClick={() => setEditingId(null)}>Cancel</button>
                    <button className={styles.saveBtn} onClick={() => handleUpdate(note.id)}>Save</button>
                  </div>
                </div>
              ) : (
                <>
                  <p className={styles.noteText}>{note.text}</p>
                  <div className={styles.noteMeta}>
                    <span className={styles.noteDate}>{formatDate(note.createdAt)}{note.updatedAt !== note.createdAt ? " · edited" : ""}</span>
                    <div className={styles.noteActions}>
                      <button className={styles.editNoteBtn} onClick={() => { setEditingId(note.id); setEditText(note.text); }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                        Edit
                      </button>
                      <button className={styles.deleteNoteBtn} onClick={() => handleDelete(note.id)}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/>
                        </svg>
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
    </div>
  );
};

export default Notes;