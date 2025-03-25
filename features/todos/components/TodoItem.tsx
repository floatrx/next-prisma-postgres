'use client';

import type { Todo } from '@prisma/client';

import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { tv, cn } from '@nextui-org/theme';
import { Check } from 'lucide-react';
import { useState, useRef, useTransition } from 'react';

import { ChangeTodoStatus, type IChangeTodoStatusProps } from '@/features/todos/components/ChangeTodoStatus';
import { RemoveTodoButton, type IRemoveTodoButtonProps } from '@/features/todos/components/RemoveTodoButton';
import { TodoStatusChip } from '@/features/todos/components/TodoStatusChip';

export interface ITodoItemProps {
  todo: Todo;
  extra?: React.ReactNode;
  className?: string;
  onRename?: (todo: Todo, newTitle: string) => Promise<any>;
  onRemove?: IRemoveTodoButtonProps['onClick'];
  onStatusChange?: IChangeTodoStatusProps['onChange'];
  /**
   * Note: We use mapping instead of extending for custom names.
   *       For example, the event in the button should be named `onClick` instead of `onRemove`,
   *       but in the component, it should be `onRemove`.
   */
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

export const TodoItem: RC<ITodoItemProps> = function ({ todo, extra, className, onRename, onRemove, onStatusChange }) {
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
      await onRename?.(todo, title);
      cancelEditMode();
    });
  };

  const cancelEditMode = setEditMode.bind(null, false);

  return (
    <div
      className={cn(variants({ status: todo.status, isEditMode }), className)}
      onDoubleClick={() => setEditMode(true)}
    >
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
                onPress={updateTitle}
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
          <ChangeTodoStatus todo={todo} onChange={onStatusChange}>
            <TodoStatusChip status={todo.status} />
          </ChangeTodoStatus>
          <RemoveTodoButton id={todo.id} onClick={onRemove} />
          {extra}
        </div>
      )}
    </div>
  );
};
