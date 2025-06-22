import React, { useState } from "react";
import { Send } from "lucide-react";
import { usePersonas } from "../hooks/usePersonas";
import { api } from "../utils/api";

const TestPage = () => {
  const { personas } = usePersonas();
  const [selectedPersona, setSelectedPersona] = useState("");
  const [testMessage, setTestMessage] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTest = async () => {
    if (!selectedPersona || !testMessage) return;

    setIsLoading(true);
    try {
      const payload = {
        personaId: selectedPersona,
        incomingMessage: testMessage,
        conversationId: "test-" + Date.now(),
        userId: "test-user",
      };

      const data = await api.processMessage(payload);
      setResponse(data.response || "No response generated");
    } catch (error) {
      setResponse("Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Test Responses</h2>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Persona
            </label>
            <select
              value={selectedPersona}
              onChange={(e) => setSelectedPersona(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Choose a persona...</option>
              {personas.map((persona) => (
                <option key={persona.id} value={persona.id}>
                  {persona.name} ({persona.tone})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Test Message
            </label>
            <textarea
              value={testMessage}
              onChange={(e) => setTestMessage(e.target.value)}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              placeholder="Enter a message to test the persona's response..."
            />
          </div>

          <button
            onClick={handleTest}
            disabled={!selectedPersona || !testMessage || isLoading}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            <Send className="h-4 w-4" />
            <span>{isLoading ? "Generating..." : "Test Response"}</span>
          </button>

          {response && (
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Generated Response:
              </p>
              <p className="text-gray-900">{response}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPage;
