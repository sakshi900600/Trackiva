import React, { useEffect, useState } from "react";
import styles from "./RecentJobs.module.css";
import JobCard from "./JobCard";
import { ArrowRight, Briefcase } from "lucide-react";
import { getJobs } from "../../../api/jobs";
import { useNavigate } from "react-router-dom";

const RecentJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getJobs({
          limit: 5,
          sortBy: "createdAt",
          order: "desc",
        });
        setJobs(res.data || []);
      } catch (err) {
        console.log("Error loading jobs", err);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerIcon}>
            <Briefcase size={16} />
          </div>
          <div>
            <h2 className={styles.title}>Recent Applications</h2>
            <p className={styles.subtitle}>Your latest job applications at a glance</p>
          </div>
        </div>
        {jobs.length > 0 && (
          <button
            className={styles.viewAllBtn}
            onClick={() => navigate("/jobs")}
          >
            View All <ArrowRight size={14} />
          </button>
        )}
      </div>

      <div className={styles.list}>
        {loading ? (
          <div className={styles.skeletonList}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles.skeletonCard}>
                <div className={styles.skeletonRow}>
                  <div className={styles.skeletonBlock} style={{ width: "40%", height: "16px" }} />
                  <div className={styles.skeletonBlock} style={{ width: "20%", height: "24px", borderRadius: "20px" }} />
                </div>
                <div className={styles.skeletonBlock} style={{ width: "25%", height: "12px", marginTop: "8px" }} />
                <div className={styles.skeletonBlock} style={{ width: "60%", height: "12px", marginTop: "8px" }} />
              </div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIllustration}>
              <img
                src="https://illustrations.popsy.co/purple/searching.svg"
                alt="No applications yet"
              />
            </div>
            <h3 className={styles.emptyTitle}>No applications yet</h3>
            <p className={styles.emptyDesc}>
              Start logging your job applications and track every opportunity in one place.
            </p>
            <button
              className={styles.emptyBtn}
              onClick={() => navigate("/jobs")}
            >
              Log Your First Application
            </button>
          </div>
        ) : (
          jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onClick={() => navigate(`/jobs/${job._id}`)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RecentJobs;