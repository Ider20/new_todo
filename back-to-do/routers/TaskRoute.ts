import { Router } from "express";
import {
  createTask,
  getToDo,
  changePriority,
  deleteTask,
  getUpdateTask,
  updateTask,
  getInProgress,
  getStuck,
  getDone,
  updateTaskToDone,
} from "../controller/taskController";

export const router = Router();
router.route("/addTask").post(createTask); // Creating Tasks
router.route("/todo").get(getToDo); // Getting ToDo
router.route("/inProgress").get(getInProgress); // Getting In Progress
router.route("/stuck").get(getStuck); // Getting Stuck
router.route("/done").get(getDone); //Getting Done
router.route("/taskPriority/:id").put(changePriority); // Updating priority
router.route("/taskDelete/:id").delete(deleteTask); // Deleting task
router.route("/taskToUpdate/:id").get(getUpdateTask); // Getting task to update
router.route("/updateTask/:id").put(updateTask); // Update task
router.route("/taskToDone/:id").put(updateTaskToDone); // Updating task to Done
