import React from "react";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { Edit, Trash, CheckCircle, Circle } from "lucide-react";
import { Button } from "../ui/button";

export default function TodoCard({
  todo,
  highlighted,
  onToggleComplete,
  onEdit,
  onDelete,
}) {
  const isCompleted = todo.status === "completed";

  // Color badge for priority
  const priorityColor =
    todo.priority === "high"
      ? "text-red-500"
      : todo.priority === "medium"
        ? "text-yellow-500"
        : "text-green-500";

  return (
    <Card
      className={`h-[220px] flex flex-col p-4 ${
        highlighted ? "bg-primary text-primary-foreground" : ""
      }`}
    >
      <CardHeader className="space-y-1">
        <div className="flex justify-between items-center">
          <h4
            className={`font-semibold truncate ${
              isCompleted ? "line-through text-muted-foreground" : ""
            }`}
          >
            {todo.title}
          </h4>

          {/* Toggle Complete */}
          <button
            onClick={() => onToggleComplete(todo)}
            className="p-1 rounded hover:bg-muted transition"
          >
            {isCompleted ? (
              <CheckCircle size={18} className="text-green-500" />
            ) : (
              <Circle size={18} className="text-gray-400" />
            )}
          </button>
        </div>

        <p
          className={`text-sm opacity-80 line-clamp-2 ${
            isCompleted ? "line-through text-muted-foreground" : ""
          }`}
        >
          {todo.description}
        </p>

        <div className="flex items-center gap-2 text-xs mt-1">
          {todo.priority && (
            <span className={`font-semibold ${priorityColor}`}>
              {todo.priority.toUpperCase()}
            </span>
          )}
          {todo.category && (
            <span className="bg-muted px-2 py-0.5 rounded text-xs">
              {todo.category}
            </span>
          )}
        </div>
      </CardHeader>

      <div className="flex-1" />

      <CardFooter className="flex justify-between items-center">
        <div className="flex flex-col text-xs">
          <span className="text-muted-foreground">
            {todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : "-"}
          </span>
          <span className="capitalize">{todo.status}</span>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="bg-white text-black border border-gray-300 hover:bg-gray-100"
            onClick={() => onEdit(todo)}
          >
            <Edit size={14} />
            <span className="hidden xl:inline">Edit</span>
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(todo)}
          >
            <Trash size={14} />
            <span className="hidden xl:inline">Delete</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
