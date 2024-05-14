"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const taskListSchema = new mongoose_1.Schema({
    title: { type: String },
    description: { type: String },
    status: { type: String, enum: ["To do", "In progress", "Stuck", "Done"] },
    priority: { type: String, enum: ["Low", "Medium", "High"] },
});
const Task = (0, mongoose_1.model)("Task", taskListSchema);
exports.default = Task;
