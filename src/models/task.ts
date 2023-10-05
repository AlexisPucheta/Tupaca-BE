import { Schema, model, Document } from 'mongoose';
import { ITask } from '../interfaces/task';
import { STATUS } from '../enums';

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
    index: { type: Number, required: true },
  },
  { timestamps: true },
);

// Agregar un método toJSON personalizado para cambiar _id a id en la representación JSON
taskSchema.set('toJSON', {
  transform: (_doc: Document, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export const Task = model<ITask>('Task', taskSchema);
