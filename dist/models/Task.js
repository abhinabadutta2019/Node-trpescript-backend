"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const taskSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, unique: true },
    completed: { type: Boolean, required: true },
});
const Task = mongoose_1.default.model("task", taskSchema);
exports.Task = Task;
