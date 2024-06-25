'use server';

import { revalidateTodos } from '@/features/todos/actions/revalidateTodos';
import { todosService } from '@/features/todos/services/todosService';

export const removeTodo = async (id: number) => {
  try {
    await todosService.remove(id);
    await revalidateTodos();
  } catch (e) {
    console.error(e);

    return { success: false, error: e.message };
  }

  return { success: true };
};
