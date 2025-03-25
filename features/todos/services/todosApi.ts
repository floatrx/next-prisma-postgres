import type { Todo } from '.prisma/client';
import type { CreateTodoPayload, UpdateTodoPayload, TodoSearchParams } from '@/types/todos';

import { rtkApi, type FeatureList } from '@/lib/store/rtkApi';

const path = '/todos';
const type: FeatureList = 'todo';

export const todosApi = rtkApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    searchTodos: query<Todo[], TodoSearchParams>({
      query: (params) => ({ url: path, params }),
      providesTags: () => [type, { type, id: 'search' }],
    }),
    createTodo: mutation<Todo, CreateTodoPayload>({
      query: (body) => ({
        url: path,
        method: 'POST',
        body,
      }),
      invalidatesTags: () => [type],
    }),
    updateTodo: mutation<Todo, { id: number; body: UpdateTodoPayload }>({
      query: ({ id, body }) => ({
        url: `${path}?id=${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_res, _err, { id }) => [
        { type, id: 'search' },
        { type, id },
      ],
    }),
    removeTodo: mutation<Todo, number>({
      query: (id) => ({
        url: `${path}?id=${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [type],
    }),
  }),
});

export const { useSearchTodosQuery, useCreateTodoMutation, useUpdateTodoMutation, useRemoveTodoMutation } = todosApi;
