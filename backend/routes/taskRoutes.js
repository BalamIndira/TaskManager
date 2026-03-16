const express = require("express");
const Task = require("../model/Task");
const ActivityLog = require("../model/ActivityLog");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

const logAction = async ({ userId, taskId, action, details }) => {
  try {
    await ActivityLog.create({
      user: userId,
      task: taskId,
      action,
      details,
    });
  } catch (err) {
    console.error("Failed to log activity", err);
  }
};

router.get("/", auth, async (req, res) => {
  try {
    const query = { $or: [{ assignedTo: req.user.id }] };

    if (req.user.role === "manager") {
      query.$or.push({ createdBy: req.user.id });
    }

    const tasks = await Task.find(query).populate(
      "assignedTo createdBy",
      "name email role",
    );
    res.json(tasks);
  } catch (error) {
    console.error("Get tasks error:", error);
    res.status(500).json("Failed to load tasks");
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;

    const assigned =
      req.user.role === "manager" ? assignedTo || req.user.id : req.user.id;

    const task = await Task.create({
      title,
      description,
      assignedTo: assigned,
      createdBy: req.user.id,
    });

    await logAction({
      userId: req.user.id,
      taskId: task._id,
      action: "created",
      details: `Created task${assigned ? " (assigned)" : ""}`,
    });

    res.json(task);
  } catch (error) {
    console.error("Create task error:", error);
    res.status(500).json("Failed to create task");
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json("Task not found");

    if (
      req.user.role !== "manager" &&
      String(task.assignedTo) !== req.user.id
    ) {
      return res.status(403).json("Not authorized");
    }

    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    await logAction({
      userId: req.user.id,
      taskId: updated._id,
      action: "updated",
      details: `Updated fields: ${Object.keys(req.body).join(", ")}`,
    });

    res.json(updated);
  } catch (error) {
    console.error("Update task error:", error);
    res.status(500).json("Failed to update task");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json("Task not found");

    if (req.user.role !== "manager" && String(task.createdBy) !== req.user.id) {
      return res.status(403).json("Not authorized");
    }

    await Task.findByIdAndDelete(req.params.id);

    await logAction({
      userId: req.user.id,
      taskId: task._id,
      action: "deleted",
      details: "Task deleted",
    });

    res.json("Task deleted");
  } catch (error) {
    console.error("Delete task error:", error);
    res.status(500).json("Failed to delete task");
  }
});

module.exports = router;
