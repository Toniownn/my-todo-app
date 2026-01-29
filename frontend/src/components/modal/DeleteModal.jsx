import React from "react";
import { Button } from "../ui/button";

export function DeleteModal({ isOpen, onClose, onConfirm, title }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background rounded-xl shadow-lg w-full max-w-sm p-6">
        <h3 className="text-lg font-bold mb-4">Delete Task</h3>
        <p className="mb-6">
          Are you sure you want to delete <strong>{title}</strong>?
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
