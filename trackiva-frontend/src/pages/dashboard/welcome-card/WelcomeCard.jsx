import React, { useEffect, useState } from "react";
import styles from "./WelcomeCard.module.css";
import { getProfile } from "../../../api/auth";

const WelcomeCard = () => {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        const name = res.data?.name || res.data?.username || "there";
        setUserName(name.split(" ")[0]);
      } catch (err) {
        setUserName("there");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const hour = new Date().getHours();
  const timeGreeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className={styles.container}>
      <div className={styles.blob1} />
      <div className={styles.blob2} />

      {/* Left */}
      <div className={styles.left}>
        <h1 className={styles.greeting}>
          Hi,{" "}
          {loading
            ? <span className={styles.nameSkeleton} />
            : <span className={styles.name}>{userName}</span>
          }!
        </h1>

        <p className={styles.subtext}>
          {timeGreeting}! Here you can see all your tracked applications,
          upcoming interviews, and manage your job search tasks.
        </p>
      </div>

      {/* Right — circular framed illustration */}
      <div className={styles.right}>
        <div className={styles.imageFrame}>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/male-hr-manager-recruiting-employee-illustration-svg-download-png-13319396.png"
            alt="Job search"
            className={styles.illustration}
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;