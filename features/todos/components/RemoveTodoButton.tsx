'use client';

import { Button, ButtonProps } from '@nextui-org/button';
import { Trash2Icon } from 'lucide-react';
import { useTransition } from 'react';

export interface IRemoveTodoButtonProps extends Omit<ButtonProps, 'id' | 'onClick'> {
  id: number;
  onClick?: (idTodo: number) => Promise<any>;
}
export const RemoveTodoButton: RC<IRemoveTodoButtonProps> = ({ id, onClick, ...props }) => {
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
      onPress={() => {
        startTransition(async () => {
          await onClick?.(id);
        });
      }}
      {...props}
    >
      <Trash2Icon size={16} />
    </Button>
  );
};
