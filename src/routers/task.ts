// const Task = require("../models/Task");
import { Task } from "../models/Task";
import { Router } from "express";
const router = Router();
import { createTask, getTasks } from "../controllers/taskController";
//
//
// Define routes
router.post("/", createTask);
router.get("/", getTasks);
//

router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.json({ message: "Task not found" });
    }
    if (req.body.name) {
      task.name = req.body.name; // Update the name if provided
    }

    if (req.body.completed !== undefined) {
      task.completed = req.body.completed; // Update completed status if provided
    }

    //
    const updatedTask = await task.save(); // Save the updated task
    //
    res.json({ updatedTask: updatedTask });
  } catch (err) {
    res.json(err);
  }
});

//
export { router as tasksRouter };
