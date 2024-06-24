'use client';

import { Input } from '@nextui-org/input';
import { Spinner } from '@nextui-org/spinner';
import { Search } from 'lucide-react';

import { useSearchParamState } from '@/hooks/useSearchParamState';

interface IProps {}

export const TodoSearchTitleInput: RC<IProps> = () => {
  const [title, setTitle, isLoading] = useSearchParamState('title');

  return (
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
  );
};
