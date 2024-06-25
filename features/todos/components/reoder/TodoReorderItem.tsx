import type { Todo } from '@prisma/client';

import { Reorder, useDragControls } from 'framer-motion';
import { GripVertical } from 'lucide-react';

import { todoVariants } from '@/config/animations';
import { TodoItem } from '@/features/todos/components/TodoItem';

interface IProps {
  item: Todo;
}

export const TodoReorderItem: RC<IProps> = ({ item }) => {
  const controls = useDragControls();

  return (
    <Reorder.Item key={item.id} dragControls={controls} dragListener={false} value={item} variants={todoVariants.item}>
      <TodoItem
        extra={
          <div
            className="-mx-3 -my-4 cursor-grab px-1 py-1 active:cursor-grabbing"
            onPointerDown={(e) => controls.start(e)}
          >
            <GripVertical size={16} />
          </div>
        }
        todo={item}
      />
    </Reorder.Item>
  );
};
