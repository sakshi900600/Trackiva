import React, { useState } from "react";
import styles from "./LinksCard.module.css";
import { addLink, updateLink, deleteLink } from "../../../../../api/jobs";
import { showSuccess, showError, showLoading, dismissToast } from "../../../../../utils/toast";

const LinksCard = ({ links = [], jobId, refetch }) => {
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ label: "", url: "" });
  const [editForm, setEditForm] = useState({ label: "", url: "" });
  const [saving, setSaving] = useState(false);

  const handleAdd = async () => {
    if (!form.label.trim() || !form.url.trim()) return;
    let url = form.url.trim();
    if (!/^https?:\/\//i.test(url)) url = "https://" + url;
    const toastId = showLoading("Adding link...");
    setSaving(true);
    try {
      await addLink(jobId, { label: form.label.trim(), url });
      dismissToast(toastId); showSuccess("Link added");
      setForm({ label: "", url: "" }); setAdding(false); refetch();
    } catch { dismissToast(toastId); showError("Failed to add link"); }
    finally { setSaving(false); }
  };

  const handleUpdate = async (linkId) => {
    if (!editForm.label.trim() || !editForm.url.trim()) return;
    let url = editForm.url.trim();
    if (!/^https?:\/\//i.test(url)) url = "https://" + url;
    const toastId = showLoading("Updating link...");
    try {
      await updateLink(jobId, linkId, { label: editForm.label.trim(), url });
      dismissToast(toastId); showSuccess("Link updated");
      setEditingId(null); refetch();
    } catch { dismissToast(toastId); showError("Failed to update link"); }
  };

  const handleDelete = async (linkId) => {
    const toastId = showLoading("Removing link...");
    try {
      await deleteLink(jobId, linkId);
      dismissToast(toastId); showSuccess("Link removed"); refetch();
    } catch { dismissToast(toastId); showError("Failed to remove link"); }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.iconBox}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
            </svg>
          </div>
          <h3 className={styles.title}>Links</h3>
          {links.length > 0 && <span className={styles.count}>{links.length}</span>}
        </div>
        <button className={styles.addBtn} onClick={() => { setAdding(!adding); setForm({ label: "", url: "" }); }}>
          {adding ? (
            <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> Cancel</>
          ) : (
            <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Add</>
          )}
        </button>
      </div>

      {adding && (
        <div className={styles.form}>
          <input className={styles.input} placeholder='Label (e.g. "Job Posting")' value={form.label} onChange={e => setForm(p => ({ ...p, label: e.target.value }))} />
          <input className={styles.input} placeholder="https://..." value={form.url} onChange={e => setForm(p => ({ ...p, url: e.target.value }))} onKeyDown={e => e.key === "Enter" && handleAdd()} />
          <div className={styles.formActions}>
            <button className={styles.cancelFormBtn} onClick={() => setAdding(false)}>Cancel</button>
            <button className={styles.saveFormBtn} onClick={handleAdd} disabled={!form.label.trim() || !form.url.trim() || saving}>
              {saving ? "Saving…" : "Add Link"}
            </button>
          </div>
        </div>
      )}

      {links.length === 0 && !adding ? (
        <p className={styles.empty}>No links added yet</p>
      ) : (
        <div className={styles.list}>
          {links.map((link) => (
            <div key={link.id} className={styles.linkRow}>
              {editingId === link.id ? (
                <div className={styles.editForm}>
                  <input className={styles.input} value={editForm.label} onChange={e => setEditForm(p => ({ ...p, label: e.target.value }))} placeholder="Label" />
                  <input className={styles.input} value={editForm.url} onChange={e => setEditForm(p => ({ ...p, url: e.target.value }))} placeholder="URL" />
                  <div className={styles.formActions}>
                    <button className={styles.cancelFormBtn} onClick={() => setEditingId(null)}>Cancel</button>
                    <button className={styles.saveFormBtn} onClick={() => handleUpdate(link.id)}>Save</button>
                  </div>
                </div>
              ) : (
                <a href={link.url} target="_blank" rel="noopener noreferrer" className={styles.linkAnchor}>
                  <div className={styles.linkDot} />
                  <div className={styles.linkInfo}>
                    <span className={styles.linkLabel}>{link.label}</span>
                    <span className={styles.linkUrl}>{link.url.replace(/^https?:\/\//, "").split("/")[0]}</span>
                  </div>
                  <svg className={styles.external} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </a>
              )}
              {editingId !== link.id && (
                <div className={styles.rowActions}>
                  <button className={styles.editRowBtn} onClick={() => { setEditingId(link.id); setEditForm({ label: link.label, url: link.url }); }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                  <button className={styles.deleteRowBtn} onClick={() => handleDelete(link.id)}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LinksCard;