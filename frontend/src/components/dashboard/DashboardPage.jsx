import React, { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import Dashboard from "./Dashboard";

export default function DashboardPage({ darkMode, setDarkMode }) {
  const [selectedFolder, setSelectedFolder] = useState("");
  const [tasks, setTasks] = useState([]);

  return (
    <div className="p-6">
      {/* Pass tasks and setTasks to header */}
      <DashboardHeader
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        tasks={tasks}
        setTasks={setTasks}
        selectedFolder={selectedFolder}
      />

      {/* Display tasks */}
      <Dashboard
        selectedFolder={selectedFolder}
        tasks={tasks}
        setTasks={setTasks}
      />
    </div>
  );
}
