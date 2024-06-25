'use client';

import type { Todo } from '@prisma/client';

import { Reorder } from 'framer-motion';
import { useState } from 'react';

import { TodoReorderItem } from './TodoReorderItem';

export interface TodoListProps {
  todos: Todo[];
}

export const TodoReorderGroup: RC<TodoListProps> = ({ todos }) => {
  const [items, setItems] = useState(todos);

  return (
    <Reorder.Group axis="y" values={items} onReorder={setItems}>
      <div className="w-full space-y-2">
        {items.map((item) => (
          <TodoReorderItem key={item.id} item={item} />
        ))}
      </div>
    </Reorder.Group>
  );
};
