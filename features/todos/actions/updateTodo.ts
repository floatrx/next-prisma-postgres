'use server';

import type { UpdateTodoPayload } from '@/types/todos';

import { revalidateTodos } from '@/features/todos/actions/revalidateTodos';
import { todosService } from '@/features/todos/services/todosService';

export const updateTodo = async (id: number, payload: UpdateTodoPayload) => {
  try {
    await todosService.update(id, payload);

    await revalidateTodos();
  } catch (e) {
    console.error(e);

    return { success: false, error: e.message };
  }

  return { success: true };
};
