import express, { Request, Response } from "express";
import { dbConnection } from "./database";
import tasksRouter from './routes/tasks.routes'

const app = express();
app.use(express.json());

const PORT = 3000;

app.get("/ping", (_req: Request, res: Response) => {
  console.log("Someone pinged here!! ");
  res.send("pong");
});

app.use('/api/v1', tasksRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

dbConnection();