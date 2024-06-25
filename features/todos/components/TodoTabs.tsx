'use client';

import { Chip } from '@nextui-org/chip';
import { Tabs, Tab } from '@nextui-org/tabs';

import { TodoReorderGroup } from '@/features/todos/components/reoder/TodoReoderGroup';
import { TodoCreateForm } from '@/features/todos/components/TodoCreateForm';
import { type TodoListProps } from '@/features/todos/components/TodoList';
import { TodoSearchFilters } from '@/features/todos/components/TodoSearchFilters';
import { useSearchParamState } from '@/hooks/useSearchParamState';

interface IProps extends TodoListProps {}
export const TodoTabs: RC<IProps> = (props) => {
  const [activeTab, setActiveTab] = useSearchParamState('tab', 'list');

  return (
    <Tabs aria-label="Options" defaultSelectedKey={activeTab} onSelectionChange={setActiveTab}>
      <Tab key="add" className="w-full" title="Add new">
        <TodoCreateForm />
      </Tab>
      <Tab
        key="list"
        className="w-full"
        title={
          <span className="stack stack-sm">
            List
            <Chip className="text-xs" size="sm" variant="bordered">
              {props.todos.length}
            </Chip>
          </span>
        }
      >
        <div className="space-y-6">
          <TodoSearchFilters />
          <TodoReorderGroup {...props} />
          <p className="text-foreground-200">Double click for Edit item</p>
        </div>
      </Tab>
    </Tabs>
  );
};
