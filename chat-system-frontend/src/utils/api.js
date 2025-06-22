export const API_BASE = "http://localhost:3001/api";

export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
};

export const api = {
  // Personas
  getPersonas: () => apiRequest("/personas"),
  createPersona: (personaData) =>
    apiRequest("/personas", {
      method: "POST",
      body: JSON.stringify(personaData),
    }),

  // Queue
  getQueueStatus: () => apiRequest("/queue/status"),

  // Users
  getActiveUsers: () => apiRequest("/users/active"),

  // Messages
  processMessage: (messageData) =>
    apiRequest("/messages/process", {
      method: "POST",
      body: JSON.stringify(messageData),
    }),
};
