import { useState, useEffect } from "react";
import { api } from "../utils/api";

export const useQueueStatus = (pollingInterval = 2000) => {
  const [queueStatus, setQueueStatus] = useState({
    queueLength: 0,
    messages: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQueueStatus = async () => {
    try {
      setError(null);
      const data = await api.getQueueStatus();
      setQueueStatus(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching queue status:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueueStatus();

    // Set up polling for real-time updates
    const interval = setInterval(fetchQueueStatus, pollingInterval);

    return () => clearInterval(interval);
  }, [pollingInterval]);

  return {
    queueStatus,
    loading,
    error,
    fetchQueueStatus,
  };
};
