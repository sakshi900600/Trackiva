import React, { useState } from "react";
import styles from "./Contacts.module.css";
import { addContact, deleteContact } from "../../../../../api/jobs";
import { showSuccess, showError, showLoading, dismissToast } from "../../../../../utils/toast";

const AVATAR_COLORS = [
  ["#eff6ff", "#2563eb"], ["#f0fdf4", "#16a34a"],
  ["#fdf4ff", "#9333ea"], ["#fff7ed", "#ea580c"],
];

const Contacts = ({ contacts = [], jobId, refetch }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);

  const handleAdd = async () => {
    if (!name.trim()) return;
    const toastId = showLoading("Adding contact...");
    setSaving(true);
    try {
      await addContact(jobId, { name: name.trim(), role: role.trim(), email: email.trim() });
      dismissToast(toastId);
      showSuccess("Contact added");
      setName(""); setRole(""); setEmail(""); setOpen(false);
      refetch();
    } catch {
      dismissToast(toastId);
      showError("Failed to add contact");
    } finally { setSaving(false); }
  };

  const handleDelete = async (contactId) => {
    const toastId = showLoading("Removing contact...");
    try {
      await deleteContact(jobId, contactId);
      dismissToast(toastId);
      showSuccess("Contact removed");
      refetch();
    } catch {
      dismissToast(toastId);
      showError("Failed to remove contact");
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.iconBox}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <h3 className={styles.title}>Contacts</h3>
          {contacts.length > 0 && <span className={styles.count}>{contacts.length}</span>}
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
          <input type="text" placeholder="Full Name *" value={name} onChange={e => setName(e.target.value)} className={styles.input} />
          <div className={styles.formRow}>
            <input type="text" placeholder="Role / Title" value={role} onChange={e => setRole(e.target.value)} className={styles.input} />
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className={styles.input} />
          </div>
          <button className={styles.saveContact} onClick={handleAdd} disabled={!name.trim() || saving}>
            {saving ? "Saving…" : "Save Contact"}
          </button>
        </div>
      )}

      <div className={styles.list}>
        {contacts.length === 0 && !open && <p className={styles.empty}>No contacts added yet</p>}
        {contacts.map((c, i) => {
          const [bg, color] = AVATAR_COLORS[i % AVATAR_COLORS.length];
          const initials = c.name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
          return (
            <div key={c.id} className={styles.item}>
              <div className={styles.avatar} style={{ background: bg, color }}>{initials}</div>
              <div className={styles.info}>
                <p className={styles.contactName}>{c.name}</p>
                <p className={styles.contactMeta}>{c.role}{c.role && c.email ? " · " : ""}{c.email}</p>
              </div>
              {c.email && (
                <a href={`mailto:${c.email}`} className={styles.mailBtn} title="Send email">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                </a>
              )}
              <button className={styles.deleteBtn} onClick={() => handleDelete(c.id)}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Contacts;