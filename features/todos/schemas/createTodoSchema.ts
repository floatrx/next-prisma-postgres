import { Status } from '@prisma/client';
import { z } from 'zod';

export const createTodoSchema = z.object({
  title: z.string({ message: 'Title is required' }).min(3, { message: 'Min 3 characters' }),
  status: z.nativeEnum(Status, { message: 'Invalid status' }),
  dueDate: z.string().transform((value) => value.replace(/\[.*?]/, '')), // Remove timezone from date string (e.g. '2022-01-01T00:00:00.000Z[UTC]')
});

export const updateTodoSchema = createTodoSchema.partial();
