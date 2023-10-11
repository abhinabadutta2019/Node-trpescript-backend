// const Task = require("../models/Task");
import { Task } from "../models/Task";
import { Router } from "express";
const router = Router();
import {
  createTask,
  getTasks,
  updateTaskByID,
  deleteTaskByID,
} from "../controllers/taskController";
//
//
// Define routes
router.post("/", createTask);
router.get("/", getTasks);
router.put("/:id", updateTaskByID);
router.delete("/:id", deleteTaskByID);
//
// router.delete("/:id", async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);

//     if (!task) {
//       return res.json({ message: "Task not found" });
//     }

//     const deleteTask = await Task.findOneAndDelete({ _id: req.params.id });

//     res.json({ deleteTask: deleteTask });
//   } catch (err) {
//     res.json(err);
//   }
// });
//
export { router as tasksRouter };
