import { z } from 'zod';
import { STATUS } from '../enums';
import { ObjectId, isObjectIdOrHexString, isValidObjectId } from 'mongoose';

export const CreateTaskSchema = z.object({
  body: z.object({
    title: z.string().min(3),
    description: z.string().optional(),
    status: z.nativeEnum(STATUS).optional(),
  }),
});

export const UpdateTaskSchema = z.object({
  body: z.object({
    title: z.string().min(3).optional(),
    description: z.string().optional(),
    status: z.nativeEnum(STATUS).optional(),
  }),
  params: z.object({
    id: z.string().refine((id) => isValidObjectId(id), { message: 'Invalid ID' }),
  }),
});

export const GetTaskSchema = z.object({
  params: z.object({
    id: z.string().refine((id) => isValidObjectId(id), { message: 'Invalid ID' }),
  }),
});

export const DeleteTaskSchema = z.object({
  params: z.object({
    id: z.string().refine((id) => isValidObjectId(id), { message: 'Invalid ID' }),
  }),
});

export type CreateTaskType = z.infer<typeof CreateTaskSchema>['body'];
export type UpdateTaskType = z.infer<typeof UpdateTaskSchema>['body'];
