import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import PersonasPage from "./pages/PersonasPage";
import TestPage from "./pages/TestPage";
import SettingsPage from "./pages/SettingsPage";
import "./App.css";

function App() {
  const [isAutoMode, setIsAutoMode] = useState(false);

  const handleToggleAutoMode = () => {
    setIsAutoMode(!isAutoMode);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard"
            element={
              <DashboardLayout
                isAutoMode={isAutoMode}
                onToggleAutoMode={handleToggleAutoMode}
              >
                <DashboardPage
                  isAutoMode={isAutoMode}
                  onToggleAutoMode={handleToggleAutoMode}
                />
              </DashboardLayout>
            }
          />
          <Route
            path="/personas"
            element={
              <DashboardLayout
                isAutoMode={isAutoMode}
                onToggleAutoMode={handleToggleAutoMode}
              >
                <PersonasPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/test"
            element={
              <DashboardLayout
                isAutoMode={isAutoMode}
                onToggleAutoMode={handleToggleAutoMode}
              >
                <TestPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <DashboardLayout
                isAutoMode={isAutoMode}
                onToggleAutoMode={handleToggleAutoMode}
              >
                <SettingsPage />
              </DashboardLayout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
