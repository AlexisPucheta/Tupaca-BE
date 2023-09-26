import { Schema, model } from "mongoose";
import { ITask } from "../interfaces/task";
import { STATUS } from "../enums";

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    status: {
      type: String,
      enum: STATUS,
      required: true,
      default: STATUS.TODO,
    },
  },
  { timestamps: true }
);

export const Task = model<ITask>("Task", taskSchema);
