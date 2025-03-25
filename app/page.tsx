import { Page } from '@/components/layout/Page';
import { TodoTabsWithServerActions } from '@/features/todos/components/TodoTabsWithServerActions';
import { todosService } from '@/features/todos/services/todosService';

/**
 * SSR / RSC / SERVER ACTIONS
 * @param searchParams
 * @constructor
 */
export default async function HomeRSC({ searchParams }: PageProps<EmptyObj, { title: string }>) {
  const todos = await todosService.search(searchParams);

  return (
    <Page heading="Todos App" subHeading="RSC & Server actions">
      <TodoTabsWithServerActions todos={todos} />
    </Page>
  );
}
