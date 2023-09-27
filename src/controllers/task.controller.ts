import { Task } from "../models/task";
import { Request, Response } from "express";
import { CreateTaskType } from "../schemas/task.schema";

export const getTasks = async (_req: Request, res: Response) => {
  try {
    const tasks = await Task.find({});
    if (!tasks) return res.status(404).json("Tasks not found");
    res.json(tasks).status(200);
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json("Task not found");
    res.json(task).status(200);
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};

export const createTask = async (
  req: Request<unknown, unknown, CreateTaskType>,
  res: Response
) => {
  try {
    const { title, description, status } = req.body;
    let newTask = new Task({
      title,
      description,
      status,
    });
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) return res.status(404).json("Task not found");
    res.sendStatus(204);
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};
