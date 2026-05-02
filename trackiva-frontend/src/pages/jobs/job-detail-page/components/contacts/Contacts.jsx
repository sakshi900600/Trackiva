import React, { useState } from "react";
import styles from "./Contacts.module.css";

const AVATAR_COLORS = [
  ["#eff6ff", "#2563eb"],
  ["#f0fdf4", "#16a34a"],
  ["#fdf4ff", "#9333ea"],
  ["#fff7ed", "#ea580c"],
];

const Contacts = ({ contacts, setContacts }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  const handleAdd = () => {
    if (!name.trim()) return;
    setContacts((prev) => [
      { id: Date.now().toString(), name: name.trim(), role: role.trim(), email: email.trim() },
      ...prev,
    ]);
    setName(""); setRole(""); setEmail("");
    setOpen(false);
  };

  const handleDelete = (id) => setContacts((prev) => prev.filter((c) => c.id !== id));

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>Contacts</h3>
        <button className={styles.addContactBtn} onClick={() => setOpen(!open)}>
          {open ? "Cancel" : "+ Add"}
        </button>
      </div>

      {open && (
        <div className={styles.form}>
          <input
            type="text"
            placeholder="Full Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
          <div className={styles.formRow}>
            <input
              type="text"
              placeholder="Role / Title"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
          </div>
          <button className={styles.saveContact} onClick={handleAdd} disabled={!name.trim()}>
            Save Contact
          </button>
        </div>
      )}

      <div className={styles.list}>
        {contacts.length === 0 && !open && (
          <p className={styles.empty}>No contacts added</p>
        )}
        {contacts.map((c, i) => {
          const [bg, color] = AVATAR_COLORS[i % AVATAR_COLORS.length];
          const initials = c.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
          return (
            <div key={c.id} className={styles.item}>
              <div className={styles.avatar} style={{ background: bg, color }}>{initials}</div>
              <div className={styles.info}>
                <p className={styles.contactName}>{c.name}</p>
                <p className={styles.contactMeta}>
                  {c.role}{c.role && c.email ? " · " : ""}{c.email}
                </p>
              </div>
              <button className={styles.deleteBtn} onClick={() => handleDelete(c.id)}>✕</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Contacts;