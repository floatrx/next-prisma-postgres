import type { Todo } from '@prisma/client';

import { Reorder, useDragControls } from 'framer-motion';
import { GripVertical } from 'lucide-react';

import { TodoItem } from '@/features/todos/components/TodoItem';

interface IProps {
  item: Todo;
}

export const TodoReorderItem: RC<IProps> = ({ item }) => {
  const controls = useDragControls();

  return (
    <Reorder.Item key={item.title} dragControls={controls} dragListener={false} value={item}>
      <TodoItem
        extra={
          <div
            className="-mx-3 -my-4 cursor-grab px-1 py-1 active:cursor-grabbing"
            onPointerDown={(e) => {
              console.log('start', item.title);
              controls.start(e);
            }}
          >
            <GripVertical size={16} />
          </div>
        }
        todo={item}
      />
    </Reorder.Item>
  );
};
