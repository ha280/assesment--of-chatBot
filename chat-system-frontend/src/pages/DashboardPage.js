import React from "react";
import { Bot, MessageCircle, Users, Play, Pause, Activity } from "lucide-react";
import StatCard from "../components/StatCard";
import ActivityItem from "../components/ActivityItem";
import { usePersonas } from "../hooks/usePersonas";
import { useQueueStatus } from "../hooks/useQueueStatus";
import { useActiveUsers } from "../hooks/useActiveUsers";

const DashboardPage = ({ isAutoMode, onToggleAutoMode }) => {
  const { personas } = usePersonas();
  const { queueStatus } = useQueueStatus();
  const { activeUsers } = useActiveUsers();

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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Active Personas"
          value={personas.length}
          icon={Bot}
          iconColor="text-blue-600"
        />

        <StatCard
          title="Queue Length"
          value={queueStatus.queueLength}
          icon={MessageCircle}
          iconColor="text-green-600"
        />

        <StatCard
          title="Active Users"
          value={Object.keys(activeUsers).length}
          icon={Users}
          iconColor="text-purple-600"
        />

        <StatCard
          title="Auto Mode"
          value={isAutoMode ? "ON" : "OFF"}
          icon={isAutoMode ? Play : Pause}
          iconColor={isAutoMode ? "text-green-600" : "text-gray-400"}
          onClick={onToggleAutoMode}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Recent Queue Activity
          </h3>
          <div className="space-y-3">
            {queueStatus.messages.slice(0, 5).map((message) => (
              <ActivityItem
                key={message.id}
                title={`Conversation #${message.conversationId.slice(-6)}`}
                subtitle={message.status}
                status={message.status}
                statusColor={getStatusColor(message.status)}
              />
            ))}
            {queueStatus.messages.length === 0 && (
              <div className="empty-state">No messages in queue</div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Active Personas
          </h3>
          <div className="space-y-3">
            {personas.slice(0, 5).map((persona) => (
              <ActivityItem
                key={persona.id}
                title={persona.name}
                subtitle={`${persona.tone} • ${persona.style}`}
                icon={Activity}
                iconColor="text-green-500"
              />
            ))}
            {personas.length === 0 && (
              <div className="empty-state">No personas configured</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
