"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksRouter = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.tasksRouter = router;
const taskController_1 = require("../controllers/taskController");
//
//
// Define routes
router.post("/", taskController_1.createTask);
router.get("/", taskController_1.getTasks);
router.put("/:id", taskController_1.updateTaskByID);
router.delete("/:id", taskController_1.deleteTaskByID);
