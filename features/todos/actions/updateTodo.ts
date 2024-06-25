'use server';

import type { UpdateTodoPayload } from '@/types/todos';

import { revalidatePath } from 'next/cache';

import { todosService } from '@/features/todos/services/todosService';

export const updateTodo = async (id: number, payload: UpdateTodoPayload) => {
  try {
    await todosService.update(id, payload);

    revalidatePath('/');
  } catch (e) {
    console.error(e);

    return { success: false, error: e.message };
  }

  return { success: true };
};
