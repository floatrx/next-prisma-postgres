import type { Todo } from '@prisma/client';

import { TodoItem } from '@/features/todos/components/TodoItem';

export interface TodoListProps {
  todos: Todo[];
}

export const TodoList: RC<TodoListProps> = ({ todos }) => {
  return <div className="w-full space-y-2">{todos?.map((todo) => <TodoItem key={todo?.id} todo={todo} />)}</div>;
};
