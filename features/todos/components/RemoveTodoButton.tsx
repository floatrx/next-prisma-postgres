'use client';

import { Button, ButtonProps } from '@nextui-org/button';
import { Trash2Icon } from 'lucide-react';
import { useTransition } from 'react';

import { removeTodo } from '../actions/removeTodo';

interface IProps extends Omit<ButtonProps, 'id'> {
  id: number;
}
export const RemoveTodoButton: RC<IProps> = ({ id, ...props }) => {
  /**
   * Use a transition to show a loading spinner during server-action execution...
   * This solution works well, but it's not perfect...
   */
  const [pending, startTransition] = useTransition();

  return (
    <Button
      isIconOnly
      className="dark:border-red-900/50 dark:text-red-300"
      color="danger"
      isLoading={pending}
      size="sm"
      variant="ghost"
      onClick={() => {
        startTransition(async () => {
          await removeTodo(id);
        });
      }}
      {...props}
    >
      <Trash2Icon size={16} />
    </Button>
  );
};
