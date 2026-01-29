import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../ui/button";
import { Plus, ChevronDown, Folder, User, LogOut } from "lucide-react";
import AddTaskModal from "../modal/AddTaskModal";
import AddFolderModal from "../modal/AddFolderModal";

export default function Sidebar({
  isOpen,
  onClose,
  onFolderSelect,
  onTaskAdded,
}) {
  const [foldersOpen, setFoldersOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isAddFolderModalOpen, setIsAddFolderModalOpen] = useState(false);
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);

  const navigate = useNavigate();
  const API_URL = "http://localhost:5000/api/folders";
  const token = localStorage.getItem("token");

  // Fetch folders
  useEffect(() => {
    const fetchFolders = async () => {
      if (!token) return;
      try {
        const res = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFolders(res.data);
        if (res.data.length > 0 && !selectedFolder) {
          setSelectedFolder(res.data[0]._id);
          onFolderSelect?.(res.data[0]._id);
        }
      } catch (err) {
        console.error("Failed to fetch folders:", err);
      }
    };
    fetchFolders();
  }, [token]);

  // Add folder
  const handleAddFolder = async (folderName) => {
    if (!folderName) return;
    try {
      const res = await axios.post(
        API_URL,
        { name: folderName },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setFolders([res.data, ...folders]);
      setSelectedFolder(res.data._id);
      onFolderSelect?.(res.data._id);
    } catch (err) {
      console.error("Failed to add folder:", err);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Select folder
  const handleSelectFolder = (folderId) => {
    setSelectedFolder(folderId);
    onFolderSelect?.(folderId);
  };

  const handleAddTask = async (task) => {
    if (!task.folder) return alert("Select a folder first!");

    try {
      const res = await axios.post("http://localhost:5000/api/tasks", task, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Task added:", res.data);
      setIsAddTaskModalOpen(false);

      // refresh
      if (onTaskAdded) onTaskAdded(task.folder);
    } catch (err) {
      console.error("Failed to add task:", err.response?.data || err.message);
      alert("Failed to save task. Check backend logs.");
    }
  };

  return (
    <>
      <aside
        className={`
          bg-background border-r p-4 space-y-4
          w-64 flex-shrink-0 flex flex-col justify-between
          transform transition-transform duration-300
          fixed top-0 left-0 h-full z-40 lg:relative lg:translate-x-0 lg:h-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div>
          <div className="flex justify-between items-center lg:hidden mb-4">
            <h2 className="text-lg font-bold">TO-DO LIST</h2>
            <button onClick={onClose} className="text-foreground">
              ✕
            </button>
          </div>

          <h2 className="hidden lg:block text-lg font-bold">TO-DO LIST</h2>

          <Button
            className="w-full flex gap-2 mt-4"
            onClick={() => setIsAddTaskModalOpen(true)}
          >
            <Plus size={16} /> Add new task
          </Button>

          <nav className="space-y-3 text-sm mt-4">
            <p className="font-semibold">Today’s tasks</p>
            <div className="pt-2">
              <button
                onClick={() => setFoldersOpen(!foldersOpen)}
                className="flex w-full items-center justify-between font-semibold hover:text-primary transition"
              >
                <span className="flex items-center gap-2">
                  <Folder size={16} /> Folders
                </span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${foldersOpen ? "rotate-180" : ""}`}
                />
              </button>

              {foldersOpen && (
                <div className="ml-6 mt-2 space-y-2 text-muted-foreground">
                  {folders.map((f) => (
                    <p
                      key={f._id}
                      className={`cursor-pointer px-2 py-1 rounded transition ${
                        selectedFolder === f._id
                          ? "bg-primary text-white"
                          : "hover:bg-muted hover:text-foreground"
                      }`}
                      onClick={() => handleSelectFolder(f._id)}
                    >
                      {f.name}
                    </p>
                  ))}
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-2 w-full flex items-center gap-1"
                    onClick={() => setIsAddFolderModalOpen(true)}
                  >
                    <Plus size={14} /> New Folder
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>

        <div className="mt-4 relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 w-full p-2 rounded hover:bg-muted transition"
          >
            <User size={20} />
            <span className="flex-1 text-left">
              {JSON.parse(localStorage.getItem("user"))?.name || "User"}
            </span>
            <ChevronDown
              size={16}
              className={`transition-transform ${profileOpen ? "rotate-180" : ""}`}
            />
          </button>

          {profileOpen && (
            <div className="absolute bottom-14 left-0 w-full bg-background border rounded shadow-md mt-2 z-50">
              <button
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-muted transition"
                onClick={handleLogout}
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </aside>

      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        onSubmit={handleAddTask}
        folders={folders}
      />
      <AddFolderModal
        isOpen={isAddFolderModalOpen}
        onClose={() => setIsAddFolderModalOpen(false)}
        onSubmit={handleAddFolder}
      />
    </>
  );
}
