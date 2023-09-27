import express, { Request, Response } from "express";
import tasksRouter from './routes/tasks.routes'

const app = express();
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("I'm alive");
});

app.use('/api/v1', tasksRouter)

export default app