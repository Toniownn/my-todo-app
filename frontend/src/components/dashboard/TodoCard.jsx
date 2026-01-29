import React, { useState } from "react";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { Edit, Trash, CheckCircle, Circle } from "lucide-react";
import { Button } from "../ui/button";
import AddTaskModal from "../modal/AddTaskModal";
import { DeleteModal } from "../modal/DeleteModal";

export default function TodoCard({
  todo,
  highlighted,
  onUpdate,
  onDelete,
  onToggleComplete,
  folders = ["Work", "Personal", "Study"], // pass folders
}) {
  const isCompleted = todo.status === "completed";

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleUpdate = (updatedTask) => {
    onUpdate(updatedTask);
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    onDelete(todo);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <Card
        className={`h-[220px] flex flex-col ${
          highlighted ? "bg-primary text-primary-foreground" : ""
        }`}
      >
        {/* Header */}
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-center">
            <h4
              className={`font-semibold truncate ${
                isCompleted ? "line-through text-muted-foreground" : ""
              }`}
            >
              {todo.title}
            </h4>

            {/* Toggle Complete/Incomplete */}
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

          {/* Description */}
          <p
            className={`text-sm opacity-80 line-clamp-2 ${
              isCompleted ? "line-through text-muted-foreground" : ""
            }`}
          >
            {todo.description}
          </p>
        </CardHeader>

        {/* Push footer to bottom */}
        <div className="flex-1" />

        {/* Footer */}
        <CardFooter className="flex justify-between items-center">
          <div className="flex flex-col text-xs">
            <span className="text-muted-foreground">{todo.dueDate}</span>
            <span className="capitalize">{todo.status}</span>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditModalOpen(true)}
              className="flex items-center gap-1"
            >
              <Edit size={14} />
              <span className="hidden xl:inline">Edit</span>
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => setIsDeleteModalOpen(true)}
              className="flex items-center gap-1"
            >
              <Trash size={14} />
              <span className="hidden xl:inline">Delete</span>
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Edit Task Modal */}
      <AddTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdate}
        folders={folders}
        // Prefill modal with existing todo
        initialData={{
          title: todo.title,
          description: todo.description,
          dueDate: todo.dueDate,
          status: todo.status,
          folder: todo.folder || folders[0],
        }}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title={todo.title}
      />
    </>
  );
}
