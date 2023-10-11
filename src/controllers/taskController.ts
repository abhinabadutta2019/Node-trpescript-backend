import { Request, Response } from "express";
import { Task } from "../models/Task";
//

//
const createTask = async (req: Request, res: Response) => {
  try {
    const { name, completed } = req.body;
    const task = new Task({
      name: name,
      completed: completed,
    });
    // console.log(task);
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

//
const updateTaskByID = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.json({ message: "Task not found" });
    }

    const { name, completed } = req.body;

    if (name) {
      task.name = name; // Update the name if provided
    }

    if (completed !== undefined) {
      task.completed = completed; // Update completed status if provided
    }

    //
    const updatedTask = await task.save(); // Save the updated task
    //
    res.json({ updatedTask: updatedTask });
  } catch (err) {
    res.json(err);
  }
};

//
const deleteTaskByID = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.json({ message: "Task not found" });
    }

    const deleteTask = await Task.findOneAndDelete({ _id: req.params.id });

    res.json({ deleteTask: deleteTask });
  } catch (err) {
    res.json(err);
  }
};

export { createTask, getTasks, updateTaskByID, deleteTaskByID };
