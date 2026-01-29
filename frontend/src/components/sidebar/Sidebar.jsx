import React, { useState } from "react";
import { Button } from "../ui/button";
import { Plus, ChevronDown, Folder, Menu, User, LogOut } from "lucide-react";
import AddTaskModal from "../modal/AddTaskModal";
import AddFolderModal from "../modal/AddFolderModal"; // new modal

export default function Sidebar({ isOpen, onClose }) {
  const [foldersOpen, setFoldersOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isAddFolderModalOpen, setIsAddFolderModalOpen] = useState(false);

  const [folders, setFolders] = useState(["Work", "Personal", "Study"]); // state now

  const handleAddTask = (task) => {
    console.log("New Task:", task);
    // TODO: Add task to your state or API
  };

  const handleAddFolder = (folderName) => {
    setFolders([...folders, folderName]);
    console.log("New Folder:", folderName);
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
            <p className="text-primary">All tasks</p>
            <p>Important tasks</p>
            <p>Completed tasks</p>
            <p>Uncompleted tasks</p>

            <div className="pt-2">
              <button
                onClick={() => setFoldersOpen(!foldersOpen)}
                className="flex w-full items-center justify-between font-semibold hover:text-primary transition"
              >
                <span className="flex items-center gap-2">
                  <Folder size={16} />
                  Folders
                </span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    foldersOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {foldersOpen && (
                <div className="ml-6 mt-2 space-y-2 text-muted-foreground">
                  {folders.map((f) => (
                    <p key={f} className="cursor-pointer hover:text-foreground">
                      {f}
                    </p>
                  ))}

                  {/* Add New Folder Button */}
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
            <span className="flex-1 text-left">John Doe</span>
            <ChevronDown
              size={16}
              className={`transition-transform ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {profileOpen && (
            <div className="absolute bottom-14 left-0 w-full bg-background border rounded shadow-md mt-2 z-50">
              <button className="flex items-center gap-2 w-full px-4 py-2 hover:bg-muted transition">
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        onSubmit={handleAddTask}
        folders={folders}
      />

      {/* Add Folder Modal */}
      <AddFolderModal
        isOpen={isAddFolderModalOpen}
        onClose={() => setIsAddFolderModalOpen(false)}
        onSubmit={handleAddFolder}
      />
    </>
  );
}
