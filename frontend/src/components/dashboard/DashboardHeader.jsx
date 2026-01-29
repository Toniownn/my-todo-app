// DashboardHeader.jsx
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import AddTaskModal from "../modal/AddTaskModal";
import axios from "axios";

export default function DashboardHeader({
  darkMode,
  setDarkMode,
  selectedFolderId,
  tasks,
  setTasks,
  refreshTasks, // <-- receive refresh function
}) {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [folders, setFolders] = useState([]);
  const token = localStorage.getItem("token");
  const FOLDER_API = "http://localhost:5000/api/folders";
  const TASK_API = "http://localhost:5000/api/tasks";

  // Fetch folders
  useEffect(() => {
    const fetchFolders = async () => {
      if (!token) return;
      try {
        const res = await axios.get(FOLDER_API, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFolders(res.data);
      } catch (err) {
        console.error("Failed to fetch folders:", err);
      }
    };
    fetchFolders();
  }, [token]);

  const handleAddTask = async (task) => {
    if (!task.folder) return alert("Select a folder first!");

    try {
      await axios.post(TASK_API, task, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsAddTaskModalOpen(false);

      // Refresh tasks for the folder
      if (refreshTasks) refreshTasks(task.folder);
    } catch (err) {
      console.error("Error adding task:", err.response?.data || err.message);
      alert("Failed to save task. Check backend logs.");
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
        <div className="flex">
          <Input placeholder="Search task" className="w-full md:w-72" />
        </div>
        <div className="flex justify-center">
          <span className="text-sm text-muted-foreground">2026, Jan 29</span>
        </div>
        <div className="flex justify-end items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">Darkmode</span>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
          <Button onClick={() => setIsAddTaskModalOpen(true)}>
            Add new task
          </Button>
        </div>
      </div>

      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        onSubmit={handleAddTask}
        folders={folders}
      />
    </>
  );
}
