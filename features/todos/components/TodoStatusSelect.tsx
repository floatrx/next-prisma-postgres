import type { Status } from '@prisma/client';

import { Select, SelectItem, SelectProps } from '@nextui-org/select';
import { forwardRef } from 'react';

import { TodoStatusName } from '@/features/todos/components/TodoStatusName';
import { todosService } from '@/features/todos/services/todosService';

interface IProps extends Omit<SelectProps, 'children'> {}

const TODO_STATUSES = todosService.getStatuses();

export const TodoStatusSelect = forwardRef<HTMLSelectElement, IProps>(({ ...props }, ref) => {
  return (
    <Select
      ref={ref}
      suppressHydrationWarning
      aria-label="status"
      placeholder="Status"
      renderValue={(value) => {
        // Custom render value -> textValue always is "Status"
        // https://nextui.org/docs/components/select#custom-render-value
        return value.length === 1 ? (
          <TodoStatusName status={value.at(0)!.textValue as Status} />
        ) : (
          <span className="flex gap-1">
            {value.map((v) => (
              <TodoStatusName key={v.key} hideTitle status={v.textValue as Status} />
            ))}
            {value.length} selected
          </span>
        );
      }}
      {...props}
    >
      {TODO_STATUSES.map((status) => (
        <SelectItem key={status} textValue={status}>
          <TodoStatusName status={status} />
        </SelectItem>
      ))}
    </Select>
  );
});

TodoStatusSelect.displayName = 'TodoStatusSelect';
