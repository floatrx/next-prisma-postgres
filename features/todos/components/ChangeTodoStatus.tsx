'use client';

import type { Todo } from '@prisma/client';

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/dropdown';
import { Spinner } from '@nextui-org/spinner';
import { useTransition } from 'react';

import { TodoStatusName } from '@/features/todos/components/TodoStatusName';
import { todosService } from '@/features/todos/services/todosService';

export interface IChangeTodoStatusProps {
  children?: React.ReactNode;
  todo: Todo;
  onChange?: (todo: Todo, newStatus: Todo['status']) => Promise<any>;
}

export const ChangeTodoStatus: RC<IChangeTodoStatusProps> = ({ todo, children, onChange }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <Dropdown>
      <DropdownTrigger>
        <span className="stack cursor-pointer">{isPending ? <Spinner color="current" size="sm" /> : children}</span>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Action event example"
        onAction={(key) => {
          startTransition(async () => {
            onChange?.(todo, key as Todo['status']);
          });
        }}
      >
        {todosService
          .getStatuses()
          // Remove the current status from the list
          .filter((s) => s !== todo.status)
          .map((status) => (
            <DropdownItem key={status} textValue={status}>
              <TodoStatusName status={status} />
            </DropdownItem>
          ))}
      </DropdownMenu>
    </Dropdown>
  );
};
