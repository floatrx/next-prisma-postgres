import type { Todo } from '.prisma/client';
import type { CreateTodoPayload, UpdateTodoPayload, TodoSearchParams } from '@/types/todos';

import { rtkApi, type FeatureList } from '@/lib/store/rtkApi';

const path = '/todos';
const type: FeatureList = 'todo';

export const todosApi = rtkApi.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    searchTodos: query<Todo[], TodoSearchParams | undefined>({
      query: (params) => ({ url: path, params }),
      providesTags: () => [
        { type, id: 'search' }, // <- search view
      ],
      keepUnusedDataFor: 60 * 60 * 1000,
    }),
    createTodo: mutation<Todo, CreateTodoPayload>({
      query: (body) => ({
        url: path,
        method: 'POST',
        body,
      }),
      invalidatesTags: (_res, _err) => [type],
    }),
    updateTodo: mutation<Todo, { id: number; body: UpdateTodoPayload }>({
      query: ({ id, body }) => ({
        url: `${path}?id=${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_res, _err, { id }) => [
        { type, id: 'search' }, // <- trigger refetch search view
        { type, id },
      ],
    }),
    removeTodo: mutation<Todo, number>({
      query: (id) => ({
        url: `${path}?id=${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_res, _err, id) => [
        { type }, // <- trigger refetch all todos
        { type, id: 'search' }, // <- trigger refetch search view
        { type, id }, // <- trigger refetch single todo
      ],
    }),
  }),
});

export const { useSearchTodosQuery, useCreateTodoMutation, useUpdateTodoMutation, useRemoveTodoMutation } = todosApi;
