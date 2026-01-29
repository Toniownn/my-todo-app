import React, { useState, useMemo } from "react";
import axios from "axios";
import TodoCard from "./TodoCard";

export default function Dashboard({
  selectedFolder,
  tasks,
  setTasks,
  searchTerm,
}) {
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [sortBy, setSortBy] = useState("date");

  const token = localStorage.getItem("token");
  const API_URL = "http://localhost:5000/api/tasks";

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

  // Filter, and sort tasks
  const displayedTasks = useMemo(() => {
    let filtered = [...tasks];

    // Filter
    if (filterStatus)
      filtered = filtered.filter((t) => t.status === filterStatus);
    if (filterPriority)
      filtered = filtered.filter((t) => t.priority === filterPriority);

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(lower) ||
          (t.description && t.description.toLowerCase().includes(lower)),
      );
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === "date") {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else if (sortBy === "priority") {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return (
          (priorityOrder[a.priority] || 3) - (priorityOrder[b.priority] || 3)
        );
      } else if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return filtered;
  }, [tasks, filterStatus, filterPriority, sortBy, searchTerm]);

  return (
    <div className="space-y-4 mt-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h3 className="text-xl font-semibold">
          {selectedFolder ? `Tasks in Folder` : "Select a folder"} (
          {displayedTasks.length} tasks)
        </h3>

        <div className="flex flex-wrap gap-2 items-center">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="date">Sort by Date</option>
            <option value="priority">Sort by Priority</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>
      </div>

      {/* No tasks */}
      {displayedTasks.length === 0 && (
        <p className="text-muted-foreground">No tasks match your criteria.</p>
      )}

      {/* Task grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayedTasks.map((todo, index) => (
          <TodoCard
            key={todo._id}
            todo={todo}
            highlighted={index === 0}
            onToggleComplete={() => handleToggleComplete(todo)}
            onDelete={() => handleDelete(todo)}
            onEdit={() => {}}
          />
        ))}

        <div className="h-[220px] flex items-center justify-center border-dashed border-2 rounded-xl text-muted-foreground cursor-pointer hover:border-primary hover:text-primary transition">
          Add new task
        </div>
      </div>
    </div>
  );
}
