import express from "express";
import { protect } from "../middleware/auth.js";
import {
  createTask,
  getTasksByFolder,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

// Create a task
router.post("/", protect, createTask);

// Get all tasks for a folder
router.get("/folder/:folderId", protect, getTasksByFolder);

// Update a task
router.put("/:id", protect, updateTask);

// Delete a task
router.delete("/:id", protect, deleteTask);

export default router;
