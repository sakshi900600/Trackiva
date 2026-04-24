import React, { useEffect, useState } from "react";
import styles from "./RecentJobs.module.css";
import JobCard from "./JobCard";
import { ArrowRight } from "lucide-react";
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
      <h2 className={styles.title}>Recent Applications</h2>

      <div className={styles.list}>
        {loading ? (
          <p className={styles.loading}>Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <div className={styles.emptyState}>
            <img
              src="https://illustrations.popsy.co/gray/searching.svg"
              alt="no jobs"
            />
            <h3>No applications yet</h3>
            <p>
              Start applying to jobs and track your progress here 🚀
            </p>
          </div>
        ) : (
          jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onClick={() => navigate(`/jobs/${job._id}`)} // ✅ NAVIGATION
            />
          ))
        )}
      </div>

      {jobs.length > 0 && (
        <>
          <div className={styles.divider}></div>

          <button
            className={styles.viewAll}
            onClick={() => navigate("/jobs")} // ✅ NAVIGATION
          >
            View All Applications <ArrowRight size={16} />
          </button>
        </>
      )}
    </div>
  );
};

export default RecentJobs;