import { useState, useEffect } from "react";
import { api } from "../utils/api";

export const useActiveUsers = (pollingInterval = 2000) => {
  const [activeUsers, setActiveUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchActiveUsers = async () => {
    try {
      setError(null);
      const data = await api.getActiveUsers();
      setActiveUsers(data.activeUsers || {});
    } catch (err) {
      setError(err.message);
      console.error("Error fetching active users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveUsers();

    // Set up polling for real-time updates
    const interval = setInterval(fetchActiveUsers, pollingInterval);

    return () => clearInterval(interval);
  }, [pollingInterval]);

  return {
    activeUsers,
    loading,
    error,
    fetchActiveUsers,
  };
};
