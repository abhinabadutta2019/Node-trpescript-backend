import { Task } from "../models/Task";
import { Router } from "express";
import { Request, Response, NextFunction } from "express";
const router = Router();
import {
  createTask,
  getTasks,
  updateTaskByID,
  deleteTaskByID,
  updateTaskCompleted,
} from "../controllers/taskController";
//
import { requireAuth } from "../middleware/requireAuth";

// Import the CustomRequest type
// import { CustomRequest } from '../middleware/requireAuth';

// require auth for all workout routes
// router.use(requireAuth);
//

//
router.get("/", requireAuth, getTasks);
//

router.post("/", createTask);
router.put("/:id", updateTaskByID);
router.delete("/:id", deleteTaskByID);
//toogle task- true/false
router.put("/updateTaskCompleted/:id", updateTaskCompleted);

//
export { router as tasksRouter };
