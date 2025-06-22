import React, { useState } from "react";

const PersonaForm = ({
  onSubmit,
  onCancel,
  initialData = null,
  isSubmitting = false,
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    tone: initialData?.tone || "friendly",
    style: initialData?.style || "casual",
    rules: initialData?.rules?.join(", ") || "",
    templates: initialData?.templates?.join("\n") || "",
  });

  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    try {
      const result = await onSubmit(formData);
      if (!result.success) {
        setSubmitError(result.error);
      }
    } catch (error) {
      setSubmitError("Network error: " + error.message);
    }
  };

  const handleCancel = () => {
    setSubmitError("");
    onCancel();
  };

  return (
    <div className="form-section">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        {initialData ? "Edit Persona" : "Create New Persona"}
      </h3>

      {submitError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter persona name..."
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Tone</label>
            <select
              value={formData.tone}
              onChange={(e) =>
                setFormData({ ...formData, tone: e.target.value })
              }
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isSubmitting}
            >
              <option value="friendly">Friendly</option>
              <option value="flirty">Flirty</option>
              <option value="professional">Professional</option>
              <option value="playful">Playful</option>
              <option value="intimate">Intimate</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="3"
            placeholder="Describe the persona's personality and background..."
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Rules (comma-separated)</label>
          <input
            type="text"
            value={formData.rules}
            onChange={(e) =>
              setFormData({ ...formData, rules: e.target.value })
            }
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Keep messages short, Use emojis, Ask questions..."
            disabled={isSubmitting}
          />
        </div>

        <div className="button-group">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Saving..."
              : initialData
              ? "Update Persona"
              : "Create Persona"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonaForm;
