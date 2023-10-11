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
exports.deleteTaskByID = exports.updateTaskByID = exports.getTasks = exports.createTask = void 0;
const Task_1 = require("../models/Task");
//
/////////////
//
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, completed } = req.body;
        const task = new Task_1.Task({
            name: name,
            completed: completed,
        });
        // console.log(task);
        //
        const createdTask = yield task.save();
        res.json({ createdTask: createdTask });
    }
    catch (err) {
        res.json(err);
    }
});
exports.createTask = createTask;
//
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield Task_1.Task.find({});
        console.log(tasks);
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
        const { name, completed } = req.body;
        if (name) {
            task.name = name; // Update the name if provided
        }
        if (completed !== undefined) {
            task.completed = completed; // Update completed status if provided
        }
        //
        const updatedTask = yield task.save(); // Save the updated task
        //
        res.json({ updatedTask: updatedTask });
    }
    catch (err) {
        res.json(err);
    }
});
exports.updateTaskByID = updateTaskByID;
//
const deleteTaskByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield Task_1.Task.findById(req.params.id);
        if (!task) {
            return res.json({ message: "Task not found" });
        }
        const deleteTask = yield Task_1.Task.findOneAndDelete({ _id: req.params.id });
        res.json({ deleteTask: deleteTask });
    }
    catch (err) {
        res.json(err);
    }
});
exports.deleteTaskByID = deleteTaskByID;
