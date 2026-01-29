import React, { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Dashboard from "@/components/dashboard/Dashboard";
import { Menu } from "lucide-react";
import axios from "axios";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);

  const token = localStorage.getItem("token");
  const TASK_API = "http://localhost:5000/api/tasks";

  // Function to refresh tasks for a folder
  const refreshTasks = async (folderId) => {
    if (!folderId || !token) {
      setTasks([]);
      return;
    }
    try {
      const res = await axios.get(`${TASK_API}/folder/${folderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data || []);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      setTasks([]);
    }
  };

  // resh task
  useEffect(() => {
    if (selectedFolder) refreshTasks(selectedFolder);
  }, [selectedFolder]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="flex min-h-screen bg-muted text-foreground">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onFolderSelect={setSelectedFolder}
          selectedFolder={selectedFolder}
          onTaskAdded={refreshTasks}
        />

        {/* Main content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Mobile Hamburger */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded bg-background shadow"
            >
              <Menu size={24} />
            </button>
          </div>

          <DashboardHeader
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            tasks={tasks}
            setTasks={setTasks}
            selectedFolderId={selectedFolder}
            refreshTasks={refreshTasks} // pass refresh to header
          />

          <Dashboard
            selectedFolder={selectedFolder}
            tasks={tasks}
            setTasks={setTasks}
          />
        </main>
      </div>
    </div>
  );
}
