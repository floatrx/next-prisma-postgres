/**
 * RTK DEMO MUTATIONS
 * - update only
 */

'use client';

import { Page } from '@/components/layout/Page';
import { TodoTabs } from '@/features/todos/components/TodoTabs';
import {
  useSearchTodosQuery,
  useUpdateTodoMutation,
  useCreateTodoMutation,
  useRemoveTodoMutation,
} from '@/features/todos/services/todosApi';

export default function RtkDemo({ searchParams }: PageProps<EmptyObj, { title: string }>) {
  const { data: todos, isFetching } = useSearchTodosQuery(searchParams);
  const [updateTodo, { isLoading: isUpdating }] = useUpdateTodoMutation();
  const [createTodo, { isLoading: isCreating }] = useCreateTodoMutation();
  const [removeTodo, { isLoading: isRemoving }] = useRemoveTodoMutation();

  const isPending = [isFetching, isUpdating, isCreating, isRemoving].some(Boolean);

  if (!todos) return null;

  return (
    <Page heading="Todos App" pending={isPending} subHeading="Using RTK">
      <TodoTabs
        todos={todos}
        onCreate={async (payload) => await createTodo(payload)}
        onRemove={async (id) => await removeTodo(id)}
        onRename={async ({ id }, title) => await updateTodo({ id, body: { title } })}
        onStatusChange={async ({ id }, status) => await updateTodo({ id, body: { status } })}
      />
    </Page>
  );
}
