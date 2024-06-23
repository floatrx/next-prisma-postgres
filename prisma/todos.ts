import type { CreateTodoPayload } from '@/types/todos';

import { Todo } from '@prisma/client';

import { createTodoSchema } from '@/features/todos/schemas/createTodoSchema';
import { prismaClient } from '@/lib/prisma';

export const todosService = {
  /**
   * Search for todos
   */
  async search(): Promise<Todo[]> {
    return prismaClient.todo.findMany();
  },

  /**
   * Create a new todo
   * @param payload
   */
  async create(payload: CreateTodoPayload): Promise<Todo> {
    const { error, success, data } = createTodoSchema.safeParse(payload);

    if (!success) {
      console.error(error);
      throw new Error('Invalid input');
    }

    return prismaClient.todo.create({ data });
  },

  /**
   * Remove a todo by ID
   * @param id
   */
  async remove(id: number): Promise<Todo> {
    return prismaClient.todo.delete({ where: { id } });
  },
};
