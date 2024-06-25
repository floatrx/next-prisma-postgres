'use server';

import type { CreateTodoPayload } from '@/types/todos';

import { revalidateTodos } from '@/features/todos/actions/revalidateTodos';
import { todosService } from '@/features/todos/services/todosService';

export const createTodo = async (payload: CreateTodoPayload) => {
  try {
    await todosService.create(payload);
    await revalidateTodos();
  } catch (e) {
    console.error(e);

    return { success: false, error: e.message };
  }

  return { success: true };
};
