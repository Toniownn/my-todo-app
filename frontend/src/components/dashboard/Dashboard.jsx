import { useState } from "react";
import TodoCard from "./TodoCard";

export default function Dashboard() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Task 1",
      description: "This is the description for this task",
      dueDate: "04/12/2023",
      status: "completed",
    },
    {
      id: 2,
      title: "Task 2",
      description: "This is the description for this task",
      dueDate: "05/15/2023",
      status: "completed",
    },
    {
      id: 3,
      title: "Task 3",
      description: "This is the description for this task",
      dueDate: "08/21/2023",
      status: "pending",
    },
    {
      id: 4,
      title: "Task 4",
      description: "This is the description for this task lorem ",
      dueDate: "08/21/2023",
      status: "pending",
    },
  ]);

  // Toggle complete/incomplete
  const handleToggleComplete = (todo) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === todo.id
          ? { ...t, status: t.status === "completed" ? "pending" : "completed" }
          : t,
      ),
    );
  };

  // Delete a todo
  const handleDelete = (todo) => {
    setTodos((prev) => prev.filter((t) => t.id !== todo.id));
  };

  // Update a todo (example: just toggles title for demo)
  const handleUpdate = (todo) => {
    const newTitle = prompt("Update title", todo.title);
    if (newTitle !== null) {
      setTodos((prev) =>
        prev.map((t) => (t.id === todo.id ? { ...t, title: newTitle } : t)),
      );
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">
        All tasks ({todos.length} tasks)
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {todos.map((todo, index) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            highlighted={index === 0}
            onToggleComplete={handleToggleComplete}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}

        <div className="h-[220px] flex items-center justify-center border-dashed border-2 rounded-xl text-muted-foreground cursor-pointer hover:border-primary hover:text-primary transition">
          Add new task
        </div>
      </div>
    </div>
  );
}
