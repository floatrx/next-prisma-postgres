import type { Status } from '@prisma/client';

import { tv } from '@nextui-org/theme';

interface IProps {
  status: Status;
}

const variants = tv({
  base: 'rounded px-1 text-sm font-bold text-white shadow-md',
  variants: {
    status: {
      TODO: 'bg-red-400 dark:bg-red-500 shadow-red-400/20 dark:text-red-950',
      IN_PROGRESS: 'bg-orange-400 shadow-yellow-400/20 dark:text-black',
      DONE: 'bg-green-500 shadow-green-400/20 dark:text-green-950',
    },
  },
});

/**
 * Todo status chip component with different colors
 * for each status (check variants)
 */
export const TodoStatusChip: RC<IProps> = ({ status }) => <span className={variants({ status })}>{status}</span>;
