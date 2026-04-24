import { useEffect, useState } from "react";
import { getJobs } from "../api/jobs";

export const useJobs = (params = {}) => {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { search = "", status = "", page = 1, limit = 10 } = params;

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const res = await getJobs({
        search,
        status,
        page,
        limit,
      });

      // 🔥 FIXED MAPPING (YOUR ISSUE WAS HERE)
      setData(res?.data || []);
      setMeta(res?.meta || null);
      setError(null);

    } catch (err) {
      setError(err?.message || "Failed to fetch jobs");
      setData([]);
      setMeta(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [search, status, page]);

  return {
    data,
    meta,        // 🔥 IMPORTANT FOR PAGINATION
    loading,
    error,
    refetch: fetchJobs,
  };
};