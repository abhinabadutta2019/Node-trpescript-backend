import { Request, Response } from "express";
import { Task } from "../models/Task";
import { TaskSchema } from "../validators/taskValidator";
import { fromZodError } from "zod-validation-error";
//

/////////////
//
const createTask = async (req: Request, res: Response) => {
  try {
    const { name, completed, description, slot } = req.body;
    const task = new Task({
      name: name,
      completed: completed,
      description: description,
      slot: slot,
    });
    // Validate the input against the Zod schema
    const validatedTask = TaskSchema.safeParse(task);
    console.log(validatedTask, "validatedTask");

    // error for zod schema
    if (!validatedTask.success) {
      console.log(
        fromZodError(validatedTask.error),
        "fromZodError(validatedTask.error)"
      );

      return res.status(400).json(fromZodError(validatedTask.error));
    }

    const validatedData = validatedTask.data;
    const createdTask = new Task({
      name: validatedData.name,
      completed: validatedData.completed,
      description: validatedData.description,
      slot: validatedData.slot,
    });

    await createdTask.save();

    res.json({ createdTask: createdTask });
    // res.json();
  } catch (err) {
    res.status(500).json(err);
  }
};

//
// const createdTask = await afterValidatedTask.save();
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

    const { name, description, completed, slot } = req.body;

    // Validate the input against the Zod schema
    const validatedTask = TaskSchema.safeParse({
      name: name || task.name,
      description: description || task.description,
      completed: completed || task.completed,
      slot: slot || task.slot,
    });

    if (!validatedTask.success) {
      return res.status(400).json(fromZodError(validatedTask.error));
    }

    console.log(validatedTask, "validatedTask");

    // Only update the task if validation is successful
    task.name = validatedTask.data.name;
    task.description = validatedTask.data.description;
    task.completed = validatedTask.data.completed;
    task.slot = validatedTask.data.slot;

    const updatedTask = await task.save(); // Save the updated task

    res.status(200).json({ updatedTask: updatedTask });
  } catch (err) {
    res.status(500).json(err);
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
