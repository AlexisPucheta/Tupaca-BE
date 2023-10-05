import express, { Request, Response } from 'express';
import tasksRouter from './routes/tasks.routes';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (_req: Request, res: Response) => {
  res.send("I'm alive");
});

app.use('/api/v1', tasksRouter);

export default app;
