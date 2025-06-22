import React, { useState } from "react";
import { Plus } from "lucide-react";
import PersonaCard from "../components/PersonaCard";
import PersonaForm from "../components/PersonaForm";
import { usePersonas } from "../hooks/usePersonas";

const PersonasPage = () => {
  const { personas, createPersona } = usePersonas();
  const [showPersonaForm, setShowPersonaForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      const result = await createPersona(formData);
      if (result.success) {
        setShowPersonaForm(false);
      }
      return result;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowPersonaForm(false);
  };

  const handleEdit = (persona) => {
    // TODO: Implement edit functionality
    console.log("Edit persona:", persona);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Personas</h2>
        <button
          onClick={() => setShowPersonaForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          <span>Add Persona</span>
        </button>
      </div>

      {showPersonaForm && (
        <PersonaForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {personas.map((persona) => (
          <PersonaCard key={persona.id} persona={persona} onEdit={handleEdit} />
        ))}

        {personas.length === 0 && !showPersonaForm && (
          <div className="empty-state">
            <p>No personas created yet.</p>
            <p>Click "Add Persona" to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonasPage;
