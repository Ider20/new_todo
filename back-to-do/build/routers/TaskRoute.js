"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const taskController_1 = require("../controller/taskController");
exports.router = (0, express_1.Router)();
exports.router.route("/addTask").post(taskController_1.createTask); // Creating Tasks
exports.router.route("/todo").get(taskController_1.getToDo); // Getting ToDo
exports.router.route("/inProgress").get(taskController_1.getInProgress); // Getting In Progress
exports.router.route("/stuck").get(taskController_1.getStuck); // Getting Stuck
exports.router.route("/done").get(taskController_1.getDone); //Getting Done
exports.router.route("/taskPriority/:id").put(taskController_1.changePriority); // Updating priority
exports.router.route("/taskDelete/:id").delete(taskController_1.deleteTask); // Deleting task
exports.router.route("/taskToUpdate/:id").get(taskController_1.getUpdateTask); // Getting task to update
exports.router.route("/updateTask/:id").put(taskController_1.updateTask); // Update task
exports.router.route("/taskToDone/:id").put(taskController_1.updateTaskToDone); // Updating task to Done
