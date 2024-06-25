import type { Status } from '@prisma/client';

import { Select, SelectItem, SelectProps } from '@nextui-org/select';
import { forwardRef } from 'react';

import { TodoStatusName } from '@/features/todos/components/TodoStatusName';
import { todosService } from '@/features/todos/services/todosService';

interface IProps extends Omit<SelectProps, 'children'> {
  showAll?: boolean;
}

const TODO_STATUSES = todosService.getStatuses();

export const TodoStatusSelect = forwardRef<HTMLSelectElement, IProps>(({ showAll, ...props }, ref) => {
  return (
    <Select
      ref={ref}
      aria-label="status"
      defaultSelectedKeys={['all']}
      placeholder="Status"
      renderValue={(value) => {
        // Custom render value -> textValue always is "Status"
        // https://nextui.org/docs/components/select#custom-render-value
        return <TodoStatusName status={value.at(0)!.textValue as Status} />;
      }}
      {...props}
    >
      {TODO_STATUSES.map((status) => (
        <SelectItem key={status} textValue={status}>
          <TodoStatusName status={status} />
        </SelectItem>
      ))}
      {showAll && (
        <SelectItem key="all" textValue="Status">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full border bg-foreground-100" />
            <span className="font-semibold">Show All statuses</span>
          </div>
        </SelectItem>
      )}
    </Select>
  );
});

TodoStatusSelect.displayName = 'TodoStatusSelect';
