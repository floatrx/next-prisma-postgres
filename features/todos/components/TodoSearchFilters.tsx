'use client';

import type { Status } from '@prisma/client';

import { Input } from '@nextui-org/input';
import { Spinner } from '@nextui-org/spinner';
import { Search } from 'lucide-react';

import { TodoStatusSelect } from '@/features/todos/components/TodoStatusSelect';
import { useSearchParamState } from '@/hooks/useSearchParamState';

interface IProps {}

export const TodoSearchFilters: RC<IProps> = () => {
  const [title, setTitle, isLoading] = useSearchParamState('title');
  const [status, setStatus] = useSearchParamState('status');

  return (
    <div className="flex w-full flex-col gap-4 sm:flex-row">
      <Input
        isClearable
        color="primary"
        defaultValue={title}
        endContent={isLoading && <Spinner size="sm" />}
        placeholder="Search todos"
        size="lg"
        startContent={<Search />}
        variant="bordered"
        onChange={(e) => setTitle(e.target.value)}
        onClear={() => setTitle('')}
      />
      <TodoStatusSelect
        defaultSelectedKeys={[status]}
        size="lg"
        value={status}
        variant="bordered"
        onChange={(s) => {
          setStatus(s.target.value as Status);
        }}
      />
    </div>
  );
};
