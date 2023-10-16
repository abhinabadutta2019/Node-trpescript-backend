"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskCompleted = exports.deleteTaskByID = exports.updateTaskByID = exports.getTasks = exports.createTask = void 0;
const Task_1 = require("../models/Task");
const taskValidator_1 = require("../validators/taskValidator");
const zod_validation_error_1 = require("zod-validation-error");
// import { requireAuth } from "../middleware/requireAuth";
//
//
/////////////
//
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //
        console.log(req.body, "req.body");
        //
        const { name, completed, description, slot } = req.body;
        const task = {
            name: name,
            completed: completed,
            description: description,
            slot: slot,
        };
        // Validate the input against the Zod schema
        const validatedTask = taskValidator_1.TaskSchema.safeParse(task);
        console.log(validatedTask, "validatedTask");
        //
        console.log(validatedTask);
        // error for zod schema
        if (!validatedTask.success) {
            console.log((0, zod_validation_error_1.fromZodError)(validatedTask.error), "fromZodError(validatedTask.error)");
            console.log((0, zod_validation_error_1.fromZodError)(validatedTask.error).message, ">>fromZodError(validatedTask.error).message");
            //zod messa in a string showing
            return res
                .status(400)
                .json({ error: (0, zod_validation_error_1.fromZodError)(validatedTask.error).message });
        }
        //
        //
        const validatedData = validatedTask.data;
        const createdTask = new Task_1.Task({
            name: validatedData.name,
            completed: validatedData.completed,
            description: validatedData.description,
            slot: validatedData.slot,
        });
        yield createdTask.save();
        res.json({ createdTask: createdTask });
        // res.json();
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.createTask = createTask;
//
// const createdTask = await afterValidatedTask.save();
//
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield Task_1.Task.find({});
        console.log(tasks, "from getTasks route");
        if (tasks.length < 1) {
            return res.json({ message: "no task found" });
        }
        //
        res.json({ tasks: tasks });
    }
    catch (err) {
        res.json(err);
    }
});
exports.getTasks = getTasks;
//
const updateTaskByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield Task_1.Task.findById(req.params.id);
        if (!task) {
            return res.json({ message: "Task not found" });
        }
        const { name, description, completed, slot } = req.body;
        // Validate the input against the Zod schema
        const validatedTask = taskValidator_1.TaskSchema.safeParse({
            name: name || task.name,
            description: description || task.description,
            completed: completed || task.completed,
            slot: slot || task.slot,
        });
        if (!validatedTask.success) {
            return res.status(400).json((0, zod_validation_error_1.fromZodError)(validatedTask.error));
        }
        console.log(validatedTask, "validatedTask");
        // Only update the task if validation is successful
        task.name = validatedTask.data.name;
        task.description = validatedTask.data.description;
        task.completed = validatedTask.data.completed;
        task.slot = validatedTask.data.slot;
        const updatedTask = yield task.save(); // Save the updated task
        res.status(200).json({ updatedTask: updatedTask });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.updateTaskByID = updateTaskByID;
//
const deleteTaskByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield Task_1.Task.findById(req.params.id);
        // const task = await Task.findById(1);
        if (!task) {
            return res.status(400).json({ message: "Task not found" });
        }
        const deletedTask = yield Task_1.Task.findOneAndDelete({ _id: req.params.id });
        // console.log(task, "from delete route");
        // res.json({ deletedTask: deletedTask });
        res.status(200).json({ message: "task deleted" });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.deleteTaskByID = deleteTaskByID;
//toogle task- true/false
const updateTaskCompleted = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //
    //
    console.log("updateTaskCompleted");
    try {
        const oneTask = yield Task_1.Task.findById(req.params.id);
        if (!oneTask) {
            return res.status(400).json({ message: "oneTask not found" });
        }
        // Toggle the value of task.completed
        oneTask.completed = !oneTask.completed;
        //
        yield oneTask.save();
        //
        const tasks = yield Task_1.Task.find();
        //
        res.status(200).json({ oneTask: oneTask, tasks: tasks });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.updateTaskCompleted = updateTaskCompleted;
