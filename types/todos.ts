import { z } from 'zod';

import { createTodoSchema, updateTodoSchema } from '@/features/todos/schemas/createTodoSchema';

export enum TodoStatuses {
  TODO = 1,
  IN_PROGRESS = 2,
  DONE = 3,
}

export type CreateTodoPayload = z.infer<typeof createTodoSchema>;
export type UpdateTodoPayload = z.infer<typeof updateTodoSchema>;
export type TodoSearchParams = { title?: string; status?: number };
