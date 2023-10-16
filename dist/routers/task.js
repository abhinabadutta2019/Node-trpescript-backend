"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksRouter = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.tasksRouter = router;
const taskController_1 = require("../controllers/taskController");
//
const requireAuth_1 = require("../middleware/requireAuth");
// Import the CustomRequest type
// import { CustomRequest } from '../middleware/requireAuth';
// require auth for all workout routes
// router.use(requireAuth);
//
//
router.get("/", requireAuth_1.requireAuth, taskController_1.getTasks);
//
router.post("/", taskController_1.createTask);
router.put("/:id", taskController_1.updateTaskByID);
router.delete("/:id", taskController_1.deleteTaskByID);
//toogle task- true/false
router.put("/updateTaskCompleted/:id", taskController_1.updateTaskCompleted);
