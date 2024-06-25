'use server';

import type { Todo } from '@prisma/client';

import { revalidateTodos } from '@/features/todos/actions/revalidateTodos';
import { todosService } from '@/features/todos/services/todosService';

export const reorderTodos = async (todos: Todo[]) => {
  try {
    await todosService.reorder(todos);
    await revalidateTodos();
  } catch (e) {
    console.error(e);

    return { success: false, error: e.message };
  }

  return { success: true };
};
