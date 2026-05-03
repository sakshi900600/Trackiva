import { useEffect, useState, useRef } from "react";
import { getJobById } from "../api/jobs";

export const useJob = (id) => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!id || hasFetched.current) return;
    hasFetched.current = true;

    const fetchJob = async () => {
      console.log("🔍 Fetching job:", id);
      console.log("🔑 Token:", localStorage.getItem("token") ? "EXISTS" : "MISSING");

      try {
        setLoading(true);
        setError(null);

        const res = await getJobById(id);

        console.log("✅ Job response:", res);

        setJob(res?.data || null);
      } catch (err) {
        console.error("❌ Job fetch error:", err);
        setError(
          typeof err === "string"
            ? err
            : err?.message || "Failed to fetch job"
        );
        setJob(null);
      } finally {
        console.log("🏁 Fetch complete");
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const refetch = () => {
    hasFetched.current = false;
    // trigger re-run by resetting state
    setLoading(true);
    setError(null);

    getJobById(id)
      .then((res) => {
        setJob(res?.data || null);
        setError(null);
      })
      .catch((err) => {
        setError(err?.message || "Failed to fetch job");
        setJob(null);
      })
      .finally(() => setLoading(false));
  };

  return { job, loading, error, refetch };
};