import type { Status } from '@prisma/client';

import { Select, SelectItem, SelectProps } from '@nextui-org/select';
import { tv } from '@nextui-org/theme';
import { forwardRef } from 'react';

import { TODO_STATUSES } from '@/config/todos';

interface IProps extends Omit<SelectProps, 'children'> {}

const variants = tv({
  base: 'size-2 rounded-full bg-red-500',
  variants: {
    status: {
      TODO: 'bg-red-400 dark:bg-red-400',
      IN_PROGRESS: 'bg-orange-400',
      DONE: 'bg-green-500',
    },
  },
});

const TodoStatusName = ({ status }: { status: Status }) => (
  <div className="flex items-center gap-2">
    <span className={variants({ status })} />
    <span className="font-semibold">{status.replace('_', ' ')}</span>
  </div>
);

export const TodoStatusSelect = forwardRef<HTMLSelectElement, IProps>((props, ref) => (
  <Select
    ref={ref}
    defaultSelectedKeys={[TODO_STATUSES[0]]}
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
  </Select>
));

TodoStatusSelect.displayName = 'TodoStatusSelect';
