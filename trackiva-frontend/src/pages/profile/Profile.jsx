import React, { useEffect, useRef, useState } from "react";
import styles from "./Profile.module.css";
import { getProfile } from "../../api/auth";

const Profile = () => {
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profileImage: null,
  });

  const [loading, setLoading] = useState(true);

  // 🔥 Fetch user data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();

        const user = res.data.data;

        // Split name → first + last
        const nameParts = user.name.split(" ");

        setForm({
          firstName: nameParts[0] || "",
          lastName: nameParts.slice(1).join(" ") || "",
          email: user.email,
          profileImage: user.avatar?.url || null,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, profileImage: URL.createObjectURL(file) });
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        
        {/* Image */}
        <div className={styles.imageSection}>
          {form.profileImage ? (
            <img src={form.profileImage} alt="profile" />
          ) : (
            <div className={styles.placeholder}>
              {form.firstName?.[0] || "U"}
            </div>
          )}

          <button onClick={() => fileInputRef.current.click()}>
            Change Photo
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            hidden
          />
        </div>

        {/* Form */}
        <div className={styles.form}>
          <div className={styles.field}>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled
            />
          </div>
        </div>

        <p className={styles.note}>
          If you have any difficulties with your profile information, please
          reach out to us for support.
        </p>
      </div>
    </div>
  );
};

export default Profile;