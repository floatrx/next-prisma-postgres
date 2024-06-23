'use server';

import { revalidatePath } from 'next/cache';

import { todosService } from '@/features/todos/services/todosService';

export const removeTodo = async (id: number) => {
  'use server';

  await todosService.remove(id);

  revalidatePath('/');

  return { success: true };
};
