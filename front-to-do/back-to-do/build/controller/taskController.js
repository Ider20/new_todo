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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskToDone = exports.updateTask = exports.getUpdateTask = exports.deleteTask = exports.changePriority = exports.getDone = exports.getStuck = exports.getInProgress = exports.getToDo = exports.createTask = void 0;
const taskModel_1 = __importDefault(require("../model/taskModel"));
// Creating Tasks
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, status, priority } = req.body;
    try {
        const task = yield taskModel_1.default.create({ title, description, status, priority });
        return res.status(201).send({ message: "Task successfully created" });
    }
    catch (error) {
        res.status(500).send({ message: "Failed to create task" });
    }
});
exports.createTask = createTask;
// Getting ToDo
const getToDo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield taskModel_1.default.find({ status: "To do" });
        res.status(200).send({ todo });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getToDo = getToDo;
// Getting inProgress
const getInProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield taskModel_1.default.find({ status: "In progress" });
        res.status(200).send({ todo });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getInProgress = getInProgress;
// Getting Stuck
const getStuck = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield taskModel_1.default.find({ status: "Stuck" });
        res.status(200).send({ todo });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getStuck = getStuck;
// Getting Done
const getDone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = yield taskModel_1.default.find({ status: "Done" });
        res.status(200).send({ todo });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getDone = getDone;
// Changing priority of tasks
const changePriority = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.id;
    const { priority } = req.body;
    try {
        const updatedPriority = yield taskModel_1.default.findByIdAndUpdate(taskId, { priority }, { new: true });
        if (!updatedPriority) {
            return res.status(404).send({ message: "Task not found" });
        }
        return res
            .status(200)
            .send({ updatedPriority, message: "Priority changed" });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to update task priority" });
    }
});
exports.changePriority = changePriority;
// Deleting task
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const deletedTask = yield taskModel_1.default.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).send({ message: "Task not found" });
        }
        return res.status(200).send({ message: "Task successfully deleted" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Failed to delete task" });
    }
});
exports.deleteTask = deleteTask;
// Getting task to update using ID
const getUpdateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const taskToUpdate = yield taskModel_1.default.findById(id);
        if (!taskToUpdate) {
            return res.status(404).send({ message: "Task not found" });
        }
        return res
            .status(200)
            .send({ taskToUpdate, message: "Task successfully found" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Failed to fetch task" });
    }
});
exports.getUpdateTask = getUpdateTask;
// Updating task once fetched data
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { title, description, status, priority } = req.body;
    try {
        const updatedtask = yield taskModel_1.default.findByIdAndUpdate(id, {
            title,
            description,
            status,
            priority,
        });
        if (!updatedtask) {
            return res.status(404).send({ message: "Task not found" });
        }
        return res
            .status(200)
            .send({ updatedtask, message: "Task successfully updated" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Failed to update task" });
    }
});
exports.updateTask = updateTask;
// Updating task to Done
const updateTaskToDone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { done } = req.body;
    console.log(done, "done");
    try {
        const updatedtask = yield taskModel_1.default.findByIdAndUpdate(id, {
            status: done,
        });
        if (!updatedtask) {
            return res.status(404).send({ message: "Task not found" });
        }
        return res
            .status(200)
            .send({ updatedtask, message: "Task successfully updated" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Failed to update task" });
    }
});
exports.updateTaskToDone = updateTaskToDone;
