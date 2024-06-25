'use client';

import type { TodoListProps } from '@/features/todos/components/TodoList';
import type { Todo } from '@prisma/client';

import { Reorder } from 'framer-motion';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

import { todoVariants } from '@/config/animations';
import { reorderTodos } from '@/features/todos/actions/orderTodos';
import { TodoReorderItem } from '@/features/todos/components/reoder/TodoReorderItem';
import { debounce } from '@/lib/debounce';

// Debounce reorderTodos server-action
const reorderDebounced = debounce(reorderTodos, 1000);

interface IProps extends TodoListProps {}

export const TodoListReorderGroup: RC<IProps> = ({ todos }) => {
  // Local state for Reorder.Group
  const [items, setItems] = useState(todos);

  const handleReorder = (newItems: Todo[]) => {
    setItems(newItems); // sync
    reorderDebounced(newItems); // update using server-action
  };

  // Sync items on todos change from parent
  useEffect(() => setItems(todos), [todos]);

  return (
    <Reorder.Group axis="y" values={items} onReorder={handleReorder}>
      <motion.div animate="visible" className="w-full space-y-2" initial="hidden" variants={todoVariants.wrapper}>
        {items.map((item) => (
          <TodoReorderItem key={item.id} item={item} />
        ))}
      </motion.div>
    </Reorder.Group>
  );
};
