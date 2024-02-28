import express from "express";
import Task from "../models/taskModel.js";

const router = express.Router();

router.get("/tasks", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    let query = {};

    // Status filter
    if (req.query.status) {
      query.Status = req.query.status.toLocaleLowerCase();
    }

    // Priority filter
    if (req.query.priority) {
      query.Priority = req.query.priority.toLocaleLowerCase();
    }

    // Search filter (title)
    if (req.query.title) {
      query.Title = { $regex: req.query.title, $options: "i" }; // Case-insensitive search
    }

    // Tags  filter
    if (req.query.tags) {
      query.Tags = { $elemMatch: { text: req.query.tags } };
    }

    const tasks = await Task.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      // We sort the data by the date of their creation in descending order (user 1 instead of -1 to get ascending order)
      .sort({ createdAt: -1 });

    const count = await Task.countDocuments();

    res.status(200).json({
      tasks,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalTask: count,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new task
router.post("/tasks", async (req, res) => {
  try {
    const newTask = await Task.create(req.body);

    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Edit an existing task by ID
router.put("/tasks/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;

    if (req.body.Status && req.body.Status.toLowerCase() === "completed") {
      req.body.CompletionDate = new Date(); // Set completionDate to the current date and time
    }

    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an existing task
router.delete("/tasks/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
