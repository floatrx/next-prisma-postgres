import type { CreateTodoPayload, UpdateTodoPayload } from '@/types/todos';

import { Todo, Status, Prisma } from '@prisma/client';

import { createTodoSchema, updateTodoSchema } from '../schemas/createTodoSchema';

import { prismaClient } from '@/lib/prisma';

type SearchParams = Prisma.TodoWhereInput;

export const todosService = {
  /**
   * Search for todos
   */
  async search({ title, status }: Partial<Todo> = {}): Promise<Todo[]> {
    let where: SearchParams = { status };

    if (title) {
      where.title = {
        contains: title,
        mode: 'insensitive',
      };
    }

    if (status) {
      where.status = {
        equals: status,
      };
    }

    return prismaClient.todo.findMany({ where });
  },

  async update(id: number, payload: UpdateTodoPayload): Promise<Todo> {
    const { error, success, data } = updateTodoSchema.safeParse(payload);

    if (!success) {
      console.error(error);
      throw new Error(error.message);
    }

    return prismaClient.todo.update({ where: { id }, data });
  },

  /**
   * Create a new todo
   * @param payload
   */
  async create(payload: CreateTodoPayload): Promise<Todo> {
    const { error, success, data } = createTodoSchema.safeParse(payload);

    if (!success) {
      console.error(error);
      throw new Error(error.message);
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

  getStatuses() {
    return Object.values(Status);
  },
};
