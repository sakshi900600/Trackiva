import { useState, useEffect, useCallback } from "react";
import { getJobById } from "../api/jobs";

export const useJob = (id) => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJob = useCallback(async () => {
    if (!id) return;
    // Don't show full loading spinner on refetch — only on initial load
    try {
      const res = await getJobById(id);
      setJob(res.data?.data || res.data);
      setError(null);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load job");
    }
  }, [id]);

  // Initial load — show spinner
  useEffect(() => {
    const initialFetch = async () => {
      setLoading(true);
      await fetchJob();
      setLoading(false);
    };
    initialFetch();
  }, [fetchJob]);

  // refetch: silently re-syncs data without showing spinner (used on error recovery)
  const refetch = useCallback(() => {
    fetchJob();
  }, [fetchJob]);

  return { job, setJob, loading, error, refetch };
};