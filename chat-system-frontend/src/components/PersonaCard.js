import React from "react";
import { Edit3, Activity } from "lucide-react";

const PersonaCard = ({ persona, onEdit }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "sent":
        return "bg-green-100 text-green-800";
      case "typing":
        return "bg-blue-100 text-blue-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="persona-card">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{persona.name}</h3>
          <p className="text-sm text-gray-500">
            {persona.tone} • {persona.style || "casual"}
          </p>
        </div>
        {onEdit && (
          <Edit3
            className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600"
            onClick={() => onEdit(persona)}
          />
        )}
      </div>

      <p className="text-sm text-gray-700 mb-4">{persona.description}</p>

      {persona.rules && persona.rules.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-medium text-gray-600 mb-2">Rules:</p>
          <div className="flex flex-wrap gap-1">
            {persona.rules.slice(0, 3).map((rule, index) => (
              <span key={index} className="rule-tag">
                {rule}
              </span>
            ))}
            {persona.rules.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                +{persona.rules.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">
          Created {new Date(persona.createdAt).toLocaleDateString()}
        </span>
        <div className="flex items-center space-x-1">
          <Activity className="h-3 w-3 text-green-500" />
          <span className="text-xs text-green-600">Active</span>
        </div>
      </div>
    </div>
  );
};

export default PersonaCard;
