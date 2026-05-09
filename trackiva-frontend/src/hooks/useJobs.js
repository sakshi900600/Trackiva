import { useState, useEffect, useCallback } from "react";
import { getJobs } from "../api/jobs";

/**
 * useJobs — fetches the jobs list and exposes refetch().
 * Pass this refetch down to the "Add Job" modal so it updates
 * the list immediately after a job is created.
 *
 * Usage in Jobs.jsx:
 *   const { jobs, loading, refetch } = useJobs(filters);
 *   <AddJobModal onSuccess={refetch} />
 *   <button onClick={refetch}>↻ Refresh</button>
 */
export const useJobs = (query = {}) => {
  const [jobs, setJobs] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = useCallback(async () => {
    try {
      const res = await getJobs(query);
      const data = res.data || [];
      setJobs(data);
      setMeta(res.meta || {});
      setError(null);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load jobs");
    }
  }, [JSON.stringify(query)]);

  // Initial load
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await fetchJobs();
      setLoading(false);
    };
    init();
  }, [fetchJobs]);

  // refetch: silent refresh (no spinner)
  const refetch = useCallback(() => {
    fetchJobs();
  }, [fetchJobs]);

  return { jobs, setJobs, meta, loading, error, refetch };
};