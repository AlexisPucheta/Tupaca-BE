import { ITask } from "../interfaces/task";
import { Task } from "../models/task";
import { Request, Response } from "express";

export const getTasks = async (_req: Request, res: Response) => {
  const tasks = await Task.find({});
  res.json(tasks);
};
