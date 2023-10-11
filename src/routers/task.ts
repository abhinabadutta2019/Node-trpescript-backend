// const Task = require("../models/Task");

import { Task } from "../models/Task";
import { Router } from "express";
const router = Router();

//
//

router.post("/", async (req, res) => {
  try {
    const task = new Task({
      name: req.body.name,
      completed: req.body.completed,
    });
    console.log(task);
    //
    const createdTask = await task.save();
    res.json({ createdTask: createdTask });
  } catch (err) {
    res.json(err);
  }
});
//
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({});
    console.log(tasks);

    if (tasks.length < 1) {
      return res.json({ message: "no task found" });
    }
    //

    res.json({ tasks: tasks });
  } catch (err) {
    res.json(err);
  }
});

//
export { router as tasksRouter };
