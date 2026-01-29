import React, { useState } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";

export default function AddFolderModal({ isOpen, onClose, onSubmit }) {
  const [folderName, setFolderName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!folderName.trim()) return;
    onSubmit(folderName.trim());
    setFolderName("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background rounded-xl shadow-lg w-full max-w-sm p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition"
        >
          <X size={20} />
        </button>

        <h3 className="text-lg font-bold mb-4">Add New Folder</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Folder Name
            </label>
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Folder name"
              required
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit">Add Folder</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
