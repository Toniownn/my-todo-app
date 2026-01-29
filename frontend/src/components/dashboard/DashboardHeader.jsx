import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import AddTaskModal from "../modal/AddTaskModal";

export default function DashboardHeader({ darkMode, setDarkMode }) {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const folders = ["Work", "Personal", "Study"];
  const handleAddTask = (task) => {
    console.log("New Task:", task);
    // TODO: Add task to your tasks state or API
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
        {/* Left: Search */}
        <div className="flex">
          <Input placeholder="Search task" className="w-full md:w-72" />
        </div>

        {/* Center: Date */}
        <div className="flex justify-center">
          <span className="text-sm text-muted-foreground">2026, Jan 29</span>
        </div>

        {/* Right: Actions */}
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

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        onSubmit={handleAddTask}
        folders={folders}
      />
    </>
  );
}
