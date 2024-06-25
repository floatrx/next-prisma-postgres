'use server';

import type { CreateTodoPayload } from '@/types/todos';

import { revalidatePath } from 'next/cache';

import { todosService } from '@/features/todos/services/todosService';

export const createTodo = async (payload: CreateTodoPayload) => {
  try {
    await todosService.create(payload);

    revalidatePath('/');
  } catch (e) {
    console.error(e);

    return { success: false, error: e.message };
  }

  return { success: true };
};
