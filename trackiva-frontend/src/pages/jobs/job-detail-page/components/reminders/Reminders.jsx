import React, { useState } from "react";
import styles from "./Reminders.module.css";
import { addReminder, updateReminder, deleteReminder } from "../../../../../api/jobs";
import { showSuccess, showError, showLoading, dismissToast } from "../../../../../utils/toast";

const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

const isOverdue = (date, time) => {
  if (!date) return false;
  const dt = time ? new Date(`${date}T${time}`) : new Date(date);
  return dt < new Date();
};

const formatDateTime = (date, time) => {
  if (!date) return "";
  try {
    const dt = time ? new Date(`${date}T${time}`) : new Date(date);
    return dt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) +
      (time ? " · " + dt.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) : "");
  } catch { return date; }
};

const Reminders = ({ reminders = [], jobId, optimisticUpdate, refetch }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", note: "", date: "", time: "" });
  const [saving, setSaving] = useState(false);

  const handleAdd = async () => {
    if (!form.title.trim()) return;
    const tempId = uid();
    const newReminder = { id: tempId, title: form.title.trim(), note: form.note.trim(), date: form.date, time: form.time, completed: false, emailSent: false };

    // Optimistic add
    optimisticUpdate(prev => ({ reminders: [...(prev.reminders || []), newReminder] }));
    setForm({ title: "", note: "", date: "", time: "" }); setOpen(false);
    setSaving(true);
    const toastId = showLoading("Adding reminder...");
    try {
      const res = await addReminder(jobId, newReminder);
      const realReminders = res.data?.data?.reminders;
      if (realReminders) optimisticUpdate(() => ({ reminders: realReminders }));
      dismissToast(toastId); showSuccess("Reminder added");
    } catch {
      optimisticUpdate(prev => ({ reminders: (prev.reminders || []).filter(r => r.id !== tempId) }));
      dismissToast(toastId); showError("Failed to add reminder");
      refetch();
    } finally { setSaving(false); }
  };

  const toggleComplete = async (reminder) => {
    const newVal = !reminder.completed;

    // Optimistic toggle
    optimisticUpdate(prev => ({
      reminders: (prev.reminders || []).map(r => r.id === reminder.id ? { ...r, completed: newVal } : r)
    }));
    try {
      await updateReminder(jobId, reminder.id, { completed: newVal });
    } catch {
      // Rollback
      optimisticUpdate(prev => ({
        reminders: (prev.reminders || []).map(r => r.id === reminder.id ? { ...r, completed: !newVal } : r)
      }));
      showError("Failed to update");
      refetch();
    }
  };

  const handleDelete = async (reminderId) => {
    const deleted = reminders.find(r => r.id === reminderId);

    // Optimistic delete
    optimisticUpdate(prev => ({ reminders: (prev.reminders || []).filter(r => r.id !== reminderId) }));
    const toastId = showLoading("Deleting...");
    try {
      await deleteReminder(jobId, reminderId);
      dismissToast(toastId); showSuccess("Deleted");
    } catch {
      optimisticUpdate(prev => ({ reminders: [...(prev.reminders || []), deleted] }));
      dismissToast(toastId); showError("Failed to delete");
      refetch();
    }
  };

  const pending = reminders.filter(r => !r.completed);
  const done = reminders.filter(r => r.completed);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.iconBox}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 01-3.46 0"/>
            </svg>
          </div>
          <h3 className={styles.title}>Reminders</h3>
          {pending.length > 0 && <span className={styles.badge}>{pending.length}</span>}
        </div>
        <button className={styles.addBtn} onClick={() => setOpen(!open)}>
          {open ? (
            <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> Cancel</>
          ) : (
            <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Add</>
          )}
        </button>
      </div>

      {open && (
        <div className={styles.form}>
          <input className={styles.input} placeholder="Reminder title *" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
          <input className={styles.input} placeholder="Note (optional)" value={form.note} onChange={e => setForm(p => ({ ...p, note: e.target.value }))} />
          <div className={styles.dateTimeRow}>
            <div className={styles.dateField}>
              <label className={styles.fieldLabel}>Date</label>
              <input type="date" className={styles.input} value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} />
            </div>
            <div className={styles.dateField}>
              <label className={styles.fieldLabel}>Time</label>
              <input type="time" className={styles.input} value={form.time} onChange={e => setForm(p => ({ ...p, time: e.target.value }))} />
            </div>
          </div>
          {form.date && form.time && (
            <div className={styles.emailNote}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
              You'll receive an email reminder at {form.time} on {new Date(form.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </div>
          )}
          <div className={styles.formActions}>
            <button className={styles.cancelFormBtn} onClick={() => setOpen(false)}>Cancel</button>
            <button className={styles.saveFormBtn} onClick={handleAdd} disabled={!form.title.trim() || saving}>
              {saving ? "Adding…" : "Add Reminder"}
            </button>
          </div>
        </div>
      )}

      {reminders.length === 0 && !open && <p className={styles.empty}>No reminders yet</p>}

      {pending.length > 0 && (
        <div className={styles.list}>
          {pending.map(item => {
            const overdue = isOverdue(item.date, item.time);
            return (
              <div key={item.id} className={`${styles.item} ${overdue ? styles.overdue : ""}`}>
                <button className={styles.checkbox} onClick={() => toggleComplete(item)}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
                <div className={styles.itemInfo}>
                  <p className={styles.itemTitle}>{item.title}</p>
                  {item.note && <p className={styles.itemNote}>{item.note}</p>}
                  {item.date && (
                    <span className={`${styles.itemDate} ${overdue ? styles.overdueDate : ""}`}>
                      {overdue ? "⚠ Overdue · " : "🗓 "}{formatDateTime(item.date, item.time)}
                    </span>
                  )}
                </div>
                <button className={styles.deleteBtn} onClick={() => handleDelete(item.id)}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {done.length > 0 && (
        <details className={styles.doneSection}>
          <summary className={styles.doneSummary}>Completed ({done.length})</summary>
          <div className={styles.doneList}>
            {done.map(item => (
              <div key={item.id} className={`${styles.item} ${styles.completed}`}>
                <button className={`${styles.checkbox} ${styles.checked}`} onClick={() => toggleComplete(item)}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
                <p className={styles.itemTitleDone}>{item.title}</p>
                <button className={styles.deleteBtn} onClick={() => handleDelete(item.id)}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  );
};

export default Reminders;