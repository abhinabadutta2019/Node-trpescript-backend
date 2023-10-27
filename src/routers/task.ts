// const Task = require("../models/Task");
import { Task } from "../models/Task";
import { Router } from "express";
import { verifyJWT } from "../middleware/verifyJWT";
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
//
// using middleware for all routes below
router.use(verifyJWT);
// router.get("/", getTasks);
//
router.get("/", getTasks);
//
router.post("/", createTask);

//
router.put("/:id", updateTaskByID);
router.delete("/:id", deleteTaskByID);
//toogle task- true/false
router.put("/updateTaskCompleted/:id", updateTaskCompleted);

//
export { router as tasksRouter };
