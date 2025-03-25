import { Reorder, useDragControls } from 'framer-motion';
import { GripVertical } from 'lucide-react';

import { todoVariants } from '@/config/animations';
import { TodoItem, type ITodoItemProps } from '@/features/todos/components/TodoItem';

export interface ITodoReorderItemProps extends ITodoItemProps {}

export const TodoReorderItem: RC<ITodoReorderItemProps> = (props) => {
  const controls = useDragControls();

  return (
    <Reorder.Item
      key={props.todo.id}
      dragControls={controls}
      dragListener={false}
      value={props.todo}
      variants={todoVariants.item}
    >
      <TodoItem
        extra={
          <div
            className="stack -mx-3 cursor-grab px-2 py-[7px] text-foreground/50 hover:text-foreground active:cursor-grabbing"
            onPointerDown={(e) => controls.start(e)}
          >
            <GripVertical size={16} />
          </div>
        }
        {...props}
      />
    </Reorder.Item>
  );
};
