import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoCard from "./TodoCard";
import EditTaskModal from "../modal/EditTaskModal";

export default function Dashboard({ selectedFolder, tasks, setTasks }) {
  const token = localStorage.getItem("token");
  const API_URL = "http://localhost:5000/api/tasks";

  const [editingTask, setEditingTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchTasks = async () => {
    if (!selectedFolder) return;
    try {
      const res = await axios.get(`${API_URL}/folder/${selectedFolder}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [selectedFolder]);

  const handleToggleComplete = async (todo) => {
    try {
      const updatedStatus =
        todo.status === "completed" ? "pending" : "completed";
      const res = await axios.put(
        `${API_URL}/${todo._id}`,
        { status: updatedStatus },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setTasks((prev) => prev.map((t) => (t._id === todo._id ? res.data : t)));
    } catch (err) {
      console.error("Failed to update task status:", err);
    }
  };

  const handleDelete = async (todo) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await axios.delete(`${API_URL}/${todo._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prev) => prev.filter((t) => t._id !== todo._id));
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const handleEdit = (todo) => {
    setEditingTask(todo);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (updatedTask) => {
    try {
      const res = await axios.put(
        `${API_URL}/${editingTask._id}`,
        updatedTask,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setTasks((prev) =>
        prev.map((t) => (t._id === editingTask._id ? res.data : t)),
      );
      setIsEditModalOpen(false);
      setEditingTask(null);
    } catch (err) {
      console.error(
        "Failed to update task:",
        err.response?.data || err.message,
      );
      alert("Failed to update task.");
    }
  };

  // Optional: sort tasks by dueDate ascending
  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
  );

  return (
    <div className="space-y-4 mt-6">
      <h3 className="text-xl font-semibold">
        {selectedFolder ? `Tasks in Folder` : "Select a folder"} ({tasks.length}{" "}
        tasks)
      </h3>

      {tasks.length === 0 && (
        <p className="text-muted-foreground">No tasks in this folder.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedTasks.map((todo, index) => (
          <TodoCard
            key={todo._id}
            todo={todo}
            highlighted={index === 0}
            onToggleComplete={() => handleToggleComplete(todo)}
            onDelete={() => handleDelete(todo)}
            onEdit={() => handleEdit(todo)} // <-- NOW WORKS
          />
        ))}

        <div className="h-[220px] flex items-center justify-center border-dashed border-2 rounded-xl text-muted-foreground cursor-pointer hover:border-primary hover:text-primary transition">
          Add new task
        </div>
      </div>

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleSaveEdit}
        task={editingTask}
      />
    </div>
  );
}
