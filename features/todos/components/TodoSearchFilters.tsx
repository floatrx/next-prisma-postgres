'use client';

import { Button } from '@heroui/button';
import { Spinner } from '@heroui/spinner';
import { Search, FilterX } from 'lucide-react';
import { useQueryState, parseAsString } from 'nuqs';
import { useTransition } from 'react';

import { DebouncedInput } from '@/components/ui/DebouncedInput';
import { TodoStatusSelect } from '@/features/todos/components/TodoStatusSelect';

interface IProps {}

export const TodoSearchFilters: RC<IProps> = () => {
  const [isLoading, startTransition] = useTransition();

  const asString = parseAsString.withDefault('').withOptions({
    startTransition,
    clearOnDefault: true,
    shallow: false,
  });

  const [title, setTitle] = useQueryState('title', asString);
  const [status, setStatus] = useQueryState('status', asString);

  const resetFilters = async () => {
    await setTitle('');
    await setStatus('', { throttleMs: 0 });
  };

  return (
    <div className="flex w-full flex-col gap-4 sm:flex-row">
      <DebouncedInput
        autoFocus
        isClearable
        color="primary"
        endContent={isLoading && <Spinner size="sm" />}
        placeholder="Search todos"
        size="lg"
        startContent={<Search />}
        value={title ?? ''}
        variant="bordered"
        onChange={setTitle}
        onClear={() => setTitle('')}
      />
      <div className="flex gap-2">
        <TodoStatusSelect
          selectedKeys={(status ?? '').split(',')}
          selectionMode="multiple"
          size="lg"
          value={status ?? []}
          variant="bordered"
          onChange={(e) => setStatus(e.target.value, { throttleMs: 500 })}
        />
        <Button isIconOnly className="text-foreground-600" size="lg" variant="bordered" onPress={resetFilters}>
          <FilterX size={20} />
        </Button>
      </div>
    </div>
  );
};
