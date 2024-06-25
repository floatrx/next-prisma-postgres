'use client';

import type { Status, Todo } from '@prisma/client';

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/dropdown';
import { Spinner } from '@nextui-org/spinner';
import { useTransition } from 'react';

import { updateTodo } from '@/features/todos/actions/updateTodo';
import { TodoStatusName } from '@/features/todos/components/TodoStatusName';
import { todosService } from '@/features/todos/services/todosService';

interface IProps {
  children?: React.ReactNode;
  todo: Todo;
}

export const ChangeTodoStatus: RC<IProps> = ({ todo, children }) => {
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
            await updateTodo(todo.id, { status: key as Status });
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
