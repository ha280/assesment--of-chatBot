import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Bot, Activity, MessageCircle, Settings } from "lucide-react";

const DashboardLayout = ({ children, isAutoMode, onToggleAutoMode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Activity, path: "/dashboard" },
    { id: "personas", label: "Personas", icon: Bot, path: "/personas" },
    { id: "test", label: "Test Responses", icon: MessageCircle, path: "/test" },
    {
      id: "API settings",
      label: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  const getActiveTab = () => {
    const currentPath = location.pathname;
    const activeItem = navItems.find((item) => item.path === currentPath);
    return activeItem ? activeItem.id : "dashboard";
  };

  const handleTabChange = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="dashboard-header">
        <div className="header-content">
          <div className="logo-section">
            <Bot className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">
              Auto Typer Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className={`status-indicator ${
                isAutoMode ? "status-active" : "status-manual"
              }`}
            >
              {isAutoMode ? "Auto Mode ON" : "Manual Mode"}
            </div>
          </div>
        </div>
      </div>

      <div className="content-wrapper">
        <div className="main-layout">
          <nav className="sidebar">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.path)}
                className={`dashboard-nav-button ${
                  getActiveTab() === item.id ? "active" : ""
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <main className="main-content">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
