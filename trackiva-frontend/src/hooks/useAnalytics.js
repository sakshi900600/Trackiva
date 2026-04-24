import { useState, useEffect } from "react";
import { getAnalytics } from "../api/analytics";

export const useAnalytics = (range = "all") => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getAnalytics(range);

        if (res.success) {
          setData(res.data);
        } else {
          setError(res.message || "Failed to fetch analytics");
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [range]);

  return { data, loading, error };
};