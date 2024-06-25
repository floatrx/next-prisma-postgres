import type { Todo } from '@prisma/client';

import { tv } from '@nextui-org/theme';

import { RemoveTodoButton } from './RemoveTodoButton';
import { TodoStatusChip } from './TodoStatusChip';

import { ChangeTodoStatus } from '@/features/todos/components/ChangeTodoStatus';

interface IProps {
  todo: Todo;
}

const variants = tv({
  base: 'stack justify-between rounded-lg border p-2 px-4 text-lg',
  variants: {
    status: {
      TODO: 'border-red-500/50 bg-red-500/10 shadow-red-400',
      IN_PROGRESS: 'border-yellow-500/50 bg-yellow-500/10 shadow-yellow-400',
      DONE: 'border-green-500 bg-green-500/10 shadow-green-400',
    },
  },
});

export const TodoItem: RC<IProps> = ({ todo }) => (
  <div className={variants({ status: todo.status })}>
    <h3>{todo.title}</h3>
    <div className="stack">
      <ChangeTodoStatus todo={todo}>
        <TodoStatusChip status={todo.status} />
      </ChangeTodoStatus>
      <RemoveTodoButton id={todo.id} />
    </div>
  </div>
);
