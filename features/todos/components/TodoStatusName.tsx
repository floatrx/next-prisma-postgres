import type { Status } from '@prisma/client';

import { tv } from '@nextui-org/theme';

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

export const TodoStatusName = ({ status }: { status: Status }) => (
  <div className="flex items-center gap-2">
    <span className={variants({ status })} />
    <span className="font-semibold">{status.replace('_', ' ')}</span>
  </div>
);