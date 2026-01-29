import express from "express";
import Folder from "../models/Folder.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// GET all folders for logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const folders = await Folder.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(folders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch folders" });
  }
});

// POST new folder
router.post("/", protect, async (req, res) => {
  const { name } = req.body;
  if (!name)
    return res.status(400).json({ message: "Folder name is required" });

  try {
    const folder = await Folder.create({ name, user: req.user._id });
    res.status(201).json(folder);
  } catch (err) {
    res.status(500).json({ message: "Failed to create folder" });
  }
});

export default router;
