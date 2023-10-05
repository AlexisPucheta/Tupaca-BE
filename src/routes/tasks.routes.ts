import express from 'express';
import { getTasks, getTask, createTask, updateTask, deleteTask } from '../controllers/task.controller';

import { validateSchema } from '../middlewares/schemaValidator';
import { CreateTaskSchema, DeleteTaskSchema, GetTaskSchema, UpdateTaskSchema } from '../schemas/task.schema';

const tasksRouter = express.Router();

tasksRouter.get('/tasks/', getTasks);

tasksRouter.get('/tasks/:id', validateSchema(GetTaskSchema), getTask);

tasksRouter.post('/tasks/', validateSchema(CreateTaskSchema), createTask);

tasksRouter.put('/tasks/:id', validateSchema(UpdateTaskSchema), updateTask);

tasksRouter.delete('/tasks/:id', validateSchema(DeleteTaskSchema), deleteTask);

export default tasksRouter;
