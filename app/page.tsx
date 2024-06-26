import { Page } from '@/components/layout/Page';
import { TodoTabs } from '@/features/todos/components/TodoTabs';
import { todosService } from '@/features/todos/services/todosService';

export default async function Home({ searchParams }: PageProps<EmptyObj, { title: string }>) {
  const todos = await todosService.search(searchParams);

  return (
    <Page heading="Todos App" subHeading="Testing vercel Postgres database with Prisma">
      <TodoTabs todos={todos} />
    </Page>
  );
}
