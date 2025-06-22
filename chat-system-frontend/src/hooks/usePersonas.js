import { useState, useEffect } from "react";
import { api } from "../utils/api";

export const usePersonas = () => {
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPersonas = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getPersonas();
      setPersonas(data.personas || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching personas:", err);
    } finally {
      setLoading(false);
    }
  };

  const createPersona = async (personaData) => {
    try {
      const payload = {
        ...personaData,
        rules: personaData.rules
          .split(",")
          .map((r) => r.trim())
          .filter((r) => r),
        templates: personaData.templates.split("\n").filter((t) => t.trim()),
      };

      const result = await api.createPersona(payload);

      if (result.success) {
        await fetchPersonas(); // Refresh the list
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchPersonas();
  }, []);

  return {
    personas,
    loading,
    error,
    fetchPersonas,
    createPersona,
  };
};
