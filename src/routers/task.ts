// const Task = require("../models/Task");
import { Task } from "../models/Task";
import { Router } from "express";
const router = Router();
import {
  createTask,
  getTasks,
  updateTaskByID,
} from "../controllers/taskController";
//
//
// Define routes
router.post("/", createTask);
router.get("/", getTasks);
router.put("/:id", updateTaskByID);
//
//
export { router as tasksRouter };
