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
    let where: SearchParams = {};

    if (title) {
      where.title = {
        contains: title,
        mode: 'insensitive',
      };
    }

    const statusList = status?.split(',').filter((s) => s.trim()) as Status[];

    if (statusList?.length) {
      where.status = {
        in: statusList,
      };
    }

    return prismaClient.todo.findMany({
      where,
      orderBy: [{ order: 'asc' }, { id: 'asc' }],
    });
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
   * Reorder (bulk)
   */
  async reorder(todos: Todo[]): Promise<Todo[]> {
    const operations = todos.map(({ id }, index) => {
      return prismaClient.todo.update({
        where: { id },
        data: { order: index + 1 }, // +1 to start the order from 1 instead of 0
      });
    });

    return prismaClient.$transaction(operations);
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
