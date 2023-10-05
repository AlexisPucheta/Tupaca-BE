import { Task } from '../models/task';
import { Request, Response } from 'express';
import { CreateTaskType } from '../schemas/task.schema';
import { ITask } from '../interfaces/task';
import { STATUS } from '../enums';

export const getTasks = async (_req: Request, res: Response) => {
  try {
    const tasks = await Task.find({});
    if (!tasks) return res.status(404).json('Tasks not found');

    const tasksByStatus: Record<string, ITask[]> = {
      toDo: [],
      inProgress: [],
      done: [],
    };

    tasks.forEach((task: ITask) => {
      if (tasksByStatus[task.status]) {
        tasksByStatus[task.status].push(task);
      }
    });

    // Sort tasks within each status array by index
    for (const status of Object.keys(tasksByStatus)) {
      tasksByStatus[status].sort((a, b) => a.index - b.index);
    }

    res.json(tasksByStatus).status(200);
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json('Task not found');
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
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};

export const createTask = async (req: Request<unknown, unknown, CreateTaskType>, res: Response) => {
  try {
    const { title, description, status } = req.body;
    // Obtén la cantidad de tareas en cada estado
    const todoTasksCount = await Task.count({ status: STATUS.TODO });
    const inProgressTasksCount = await Task.count({
      status: STATUS.IN_PROGRESS,
    });
    const doneTasksCount = await Task.count({ status: STATUS.DONE });

    // Calcula el índice en función del estado de la nueva tarea
    let newIndex = 0;
    if (status === STATUS.TODO) {
      newIndex = todoTasksCount;
    } else if (status === STATUS.IN_PROGRESS) {
      newIndex = inProgressTasksCount;
    } else if (status === STATUS.DONE) {
      newIndex = doneTasksCount;
    }

    // Crea la nueva tarea con el índice calculado
    let newTask = new Task({
      title,
      description,
      status,
      index: newIndex, // Asigna el índice
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
    if (!deletedTask) return res.status(404).json('Task not found');
    res.sendStatus(204);
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};
