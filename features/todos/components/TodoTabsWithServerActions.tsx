'use client';

import type { Todo } from '@prisma/client';

import React from 'react';

import { createTodo } from '@/features/todos/actions/createTodo';
import { removeTodo } from '@/features/todos/actions/removeTodo';
import { updateTodo } from '@/features/todos/actions/updateTodo';
import { TodoTabs } from '@/features/todos/components/TodoTabs';

interface IProps {
  todos: Todo[];
}

export const TodoTabsWithServerActions: RC<IProps> = ({ todos }) => (
  <TodoTabs
    todos={todos}
    onCreate={async (payload) => await createTodo(payload)}
    onRemove={async (id) => await removeTodo(id)}
    onRename={async (todo, title) => await updateTodo(todo.id, { title })}
    onStatusChange={async (todo, status) => await updateTodo(todo.id, { status })}
  />
);
