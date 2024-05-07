import { Response, Request } from "express";
import Task from "../model/taskModel";

// Creating Tasks
export const createTask = async (req: Request, res: Response) => {
  const { title, description, status, priority } = req.body;
  try {
    const task = await Task.create({ title, description, status, priority });
    return res.status(201).send({ message: "Task successfully created" });
  } catch (error) {
    res.status(500).send({ message: "Failed to create task" });
  }
};

// Getting ToDo
export const getToDo = async (req: Request, res: Response) => {
  try {
    const todo = await Task.find({ status: "To do" });
    res.status(200).send({ todo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Getting inProgress
export const getInProgress = async (req: Request, res: Response) => {
  try {
    const todo = await Task.find({ status: "In progress" });
    res.status(200).send({ todo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Getting Stuck
export const getStuck = async (req: Request, res: Response) => {
  try {
    const todo = await Task.find({ status: "Stuck" });
    res.status(200).send({ todo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Getting Done
export const getDone = async (req: Request, res: Response) => {
  try {
    const todo = await Task.find({ status: "Done" });
    res.status(200).send({ todo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Changing priority of tasks
export const changePriority = async (req: Request, res: Response) => {
  const taskId = req.params.id;
  const { priority } = req.body;
  try {
    const updatedPriority = await Task.findByIdAndUpdate(
      taskId,
      { priority },
      { new: true }
    );
    if (!updatedPriority) {
      return res.status(404).send({ message: "Task not found" });
    }
    return res
      .status(200)
      .send({ updatedPriority, message: "Priority changed" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to update task priority" });
  }
};

// Deleting task
export const deleteTask = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).send({ message: "Task not found" });
    }
    return res.status(200).send({ message: "Task successfully deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Failed to delete task" });
  }
};

// Getting task to update using ID
export const getUpdateTask = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const taskToUpdate = await Task.findById(id);
    if (!taskToUpdate) {
      return res.status(404).send({ message: "Task not found" });
    }
    return res
      .status(200)
      .send({ taskToUpdate, message: "Task successfully found" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Failed to fetch task" });
  }
};

// Updating task once fetched data
export const updateTask = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { title, description, status, priority } = req.body;
  try {
    const updatedtask = await Task.findByIdAndUpdate(id, {
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
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Failed to update task" });
  }
};

// Updating task to Done
export const updateTaskToDone = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { done } = req.body;
  console.log(done, "done");
  try {
    const updatedtask = await Task.findByIdAndUpdate(id, {
      status: done,
    });
    if (!updatedtask) {
      return res.status(404).send({ message: "Task not found" });
    }
    return res
      .status(200)
      .send({ updatedtask, message: "Task successfully updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Failed to update task" });
  }
};
