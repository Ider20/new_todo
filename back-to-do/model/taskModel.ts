import { Schema, model } from "mongoose";

const taskListSchema = new Schema({
  title: { type: String },
  description: { type: String },
  status: { type: String, enum: ["To do", "In progress", "Stuck", "Done"] },
  priority: { type: String, enum: ["Low", "Medium", "High"] },
});

const Task = model("Task", taskListSchema);
export default Task;
