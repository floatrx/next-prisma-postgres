'use client';

import type { Todo } from '@prisma/client';

import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { tv } from '@nextui-org/theme';
import { Check } from 'lucide-react';
import { useState, useRef, useTransition } from 'react';

import { updateTodo } from '@/features/todos/actions/updateTodo';
import { ChangeTodoStatus } from '@/features/todos/components/ChangeTodoStatus';
import { RemoveTodoButton } from '@/features/todos/components/RemoveTodoButton';
import { TodoStatusChip } from '@/features/todos/components/TodoStatusChip';

interface IProps {
  todo: Todo;
  extra?: React.ReactNode;
}

const variants = tv({
  base: 'stack justify-between rounded-lg border p-2 px-4 text-lg cursor-pointer select-none relative backdrop-blur-md touch-pan-x',
  variants: {
    status: {
      TODO: 'border-red-500/50 bg-red-500/10 shadow-red-400',
      IN_PROGRESS: 'border-yellow-500/50 bg-yellow-500/10 shadow-yellow-400',
      DONE: 'border-green-500 bg-green-500/10 shadow-green-400',
    },
    isEditMode: {
      true: 'border-blue-500/50 bg-blue-500/10 shadow-blue-400 p-1 px-4',
    },
  },
});

export const TodoItem: RC<IProps> = function ({ todo, extra }) {
  const [isEditMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const initialTitle = useRef<string>(todo.title);
  const [isPending, startTransition] = useTransition();

  const updateTitle = () => {
    startTransition(async () => {
      if (title === initialTitle.current) {
        cancelEditMode();

        return;
      }
      await updateTodo(todo.id, { title });
      cancelEditMode();
    });
  };

  const cancelEditMode = setEditMode.bind(null, false);

  return (
    <div className={variants({ status: todo.status, isEditMode })} onDoubleClick={() => setEditMode(true)}>
      <h3 className="flex flex-1">
        {isEditMode ? (
          <span className="stack stack-sm flex-1">
            <Input
              autoFocus
              classNames={{
                inputWrapper: 'border-0 p-0 text-md', // hide borders
                input: 'text-md',
              }}
              value={title}
              variant="bordered"
              onBlur={updateTitle}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key !== 'Enter') return;
                updateTitle();
              }}
            />
            <span className="stack stack-sm text-foreground">
              <Button
                isIconOnly
                className="text-white"
                color="success"
                isLoading={isPending}
                size="sm"
                onClick={updateTitle}
              >
                <Check size={15} />
              </Button>
            </span>
          </span>
        ) : (
          todo.title
        )}
      </h3>
      {!isEditMode && (
        <div className="stack">
          <ChangeTodoStatus todo={todo}>
            <TodoStatusChip status={todo.status} />
          </ChangeTodoStatus>
          <RemoveTodoButton id={todo.id} />
          {extra}
        </div>
      )}
    </div>
  );
};
