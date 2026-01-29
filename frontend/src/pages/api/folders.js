import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import AddTaskModal from "../modal/AddTaskModal";

export default function DashboardHeader({ darkMode, setDarkMode }) {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]); // <-- New state for tasks

  const folders = ["Work", "Personal", "Study"];

  const handleAddTask = (task) => {
    // Add the new task to the tasks array
    setTasks((prev) => [...prev, task]);
    console.log("All Tasks:", [...tasks, task]);
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

      {/* Display tasks */}
      <div className="mt-6 space-y-2">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="border rounded p-3 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{task.title}</p>
              <p className="text-sm text-muted-foreground">
                {task.description}
              </p>
              <p className="text-xs text-muted-foreground">
                Due: {task.dueDate || "No due date"} | Status: {task.status} |
                Folder: {task.folder}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
