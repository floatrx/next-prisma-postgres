import { z } from 'zod';

import { createTodoSchema } from '@/features/todos/schemas/createTodoSchema';

export enum TodoStatuses {
  TODO = 1,
  IN_PROGRESS = 2,
  DONE = 3,
}

export type CreateTodoPayload = z.infer<typeof createTodoSchema>;
