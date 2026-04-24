import React, { useState } from "react";
import styles from "./Contacts.module.css";

const Contacts = ({ contacts, setContacts }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  // Add Contact
  const handleAdd = () => {
    if (!name.trim()) return;

    const newContact = {
      id: Date.now().toString(),
      name,
      role,
      email,
    };

    setContacts((prev) => [newContact, ...prev]);

    setName("");
    setRole("");
    setEmail("");
  };

  // Delete
  const handleDelete = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Contacts</h3>

      {/* Add */}
      <div className={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleAdd}>Add</button>
      </div>

      {/* List */}
      <div className={styles.list}>
        {contacts.length === 0 && (
          <p className={styles.empty}>No contacts yet</p>
        )}

        {contacts.map((c) => (
          <div key={c.id} className={styles.item}>
            <div>
              <p className={styles.name}>{c.name}</p>
              <p className={styles.meta}>
                {c.role} {c.email && `• ${c.email}`}
              </p>
            </div>

            <button
              className={styles.deleteBtn}
              onClick={() => handleDelete(c.id)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;