'use server';

import type { CreateTodoPayload } from '@/types/todos';

import { revalidatePath } from 'next/cache';

import { todosService } from '@/features/todos/services/todosService';

export const createTodo = async (payload: CreateTodoPayload) => {
  'use server';

  await todosService.create(payload);

  revalidatePath('/');

  return { success: true };
};
