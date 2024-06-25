'use server';

import { revalidatePath } from 'next/cache';

import { todosService } from '@/features/todos/services/todosService';

export const removeTodo = async (id: number) => {
  try {
    await todosService.remove(id);

    revalidatePath('/');
  } catch (e) {
    console.error(e);

    return { success: false, error: e.message };
  }

  return { success: true };
};
