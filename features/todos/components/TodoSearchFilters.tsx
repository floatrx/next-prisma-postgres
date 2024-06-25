'use client';

import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Spinner } from '@nextui-org/spinner';
import { Search, FilterX } from 'lucide-react';

import { TodoStatusSelect } from '@/features/todos/components/TodoStatusSelect';
import { useSearchParamState } from '@/hooks/useSearchParamState';

interface IProps {}

export const TodoSearchFilters: RC<IProps> = () => {
  const [title, setTitle, isLoading] = useSearchParamState('title');
  const [status, setStatus] = useSearchParamState('status');

  const resetFilters = () => {
    setTitle('');
    setStatus('');
  };

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
        selectedKeys={status.split(',')}
        selectionMode="multiple"
        size="lg"
        value={status}
        variant="bordered"
        onChange={(e) => setStatus(e.target.value)}
      />
      <Button isIconOnly className="text-foreground-600" size="lg" variant="bordered" onClick={resetFilters}>
        <FilterX size={20} />
      </Button>
    </div>
  );
};
