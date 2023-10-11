import { Request, Response } from "express";
import { Task } from "../models/Task";

//
const createTask = async (req: Request, res: Response) => {
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
};
//
const getTasks = async (req: Request, res: Response) => {
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
};

export { createTask, getTasks };
