'use server';

import { revalidatePath } from 'next/cache';

import { todosService } from '@/prisma/todos';

export const removeTodo = async (id: number) => {
  'use server';

  await todosService.remove(id);

  revalidatePath('/');

  return { success: true };
};
