import Task from "../models/Task.js";

// Create a new task
export const createTask = async (req, res) => {
  const { title, description, status, dueDate, folder, priority, category } =
    req.body;

  if (!title || !folder) {
    return res.status(400).json({ message: "Title and folder are required" });
  }

  try {
    const task = await Task.create({
      title,
      description,
      status: status || "pending",
      dueDate,
      folder,
      priority: priority || "medium", // default medium
      category,
      user: req.user._id,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all tasks for a folder
export const getTasksByFolder = async (req, res) => {
  try {
    const tasks = await Task.find({
      folder: req.params.folderId,
      user: req.user._id,
    }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body, // priority and category can now be updated
      { new: true },
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
