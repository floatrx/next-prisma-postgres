'use client';

import type { TodoListProps } from '@/features/todos/components/TodoList';

import { Chip } from '@nextui-org/chip';
import { Tabs, Tab } from '@nextui-org/tabs';
import { useQueryState, parseAsString } from 'nuqs';

import { TodoListReorderGroup } from '@/features/todos/components/reoder/TodoListReorderGroup';
import { TodoCreateForm } from '@/features/todos/components/TodoCreateForm';
import { TodoSearchFilters } from '@/features/todos/components/TodoSearchFilters';

interface IProps extends TodoListProps {}

export const TodoTabs: RC<IProps> = ({ todos }) => {
  const [activeTab, setActiveTab] = useQueryState(
    'tab',
    parseAsString.withOptions({ clearOnDefault: true }).withDefault('list'),
  );

  return (
    <Tabs aria-label="Options" defaultSelectedKey={activeTab} onSelectionChange={(key) => setActiveTab(String(key))}>
      <Tab
        key="list"
        className="w-full"
        title={
          <span className="stack stack-sm">
            List
            <Chip className="text-xs" size="sm" variant="bordered">
              {todos.length}
            </Chip>
          </span>
        }
      >
        <div className="space-y-6">
          <TodoSearchFilters />
          <TodoListReorderGroup todos={todos} />
          <p className="text-foreground-200">Double click for Edit item. Click status badge to change it.</p>
        </div>
      </Tab>
      <Tab key="add" className="w-full" title="Add new">
        <TodoCreateForm />
      </Tab>
    </Tabs>
  );
};
