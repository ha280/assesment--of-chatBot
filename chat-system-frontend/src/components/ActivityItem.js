import React from "react";

const ActivityItem = ({
  title,
  subtitle,
  status,
  statusColor = "bg-gray-100 text-gray-800",
  icon: Icon,
  iconColor = "text-green-500",
}) => {
  return (
    <div className="activity-item">
      <div>
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
      {status && (
        <div className={`px-2 py-1 rounded text-xs font-medium ${statusColor}`}>
          {status}
        </div>
      )}
      {Icon && (
        <div className="flex items-center space-x-2">
          <Icon className={`h-4 w-4 ${iconColor}`} />
          <span className="text-xs text-gray-500">Active</span>
        </div>
      )}
    </div>
  );
};

export default ActivityItem;
