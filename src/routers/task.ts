// const Task = require("../models/Task");
import { Task } from "../models/Task";
import { Router } from "express";
const router = Router();
import {
  createTask,
  getTasks,
  updateTaskByID,
  deleteTaskByID,
  updateTaskCompleted,
} from "../controllers/taskController";
//
//
// Define routes
router.post("/", createTask);
router.get("/", getTasks);
router.put("/:id", updateTaskByID);
router.delete("/:id", deleteTaskByID);
//toogle task- true/false
router.put("/updateTaskCompleted/:id", updateTaskCompleted);

//
export { router as tasksRouter };
