import { Chip } from '@nextui-org/chip';
import { Code } from '@nextui-org/code';
import { cn } from '@nextui-org/theme';

import { title, subtitle } from '@/components/primitives';
import { TodoCreateForm } from '@/features/todos/components/TodoCreateForm';
import { TodoItem } from '@/features/todos/components/TodoItem';
import { TodoSearchFilters } from '@/features/todos/components/TodoSearchFilters';
import { todosService } from '@/features/todos/services/todosService';

export default async function Home({ searchParams }: PageProps<EmptyObj, { title: string }>) {
  const todos = await todosService.search(searchParams);

  return (
    <section className="m-auto flex max-w-lg flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg justify-center text-center">
        <h1 className={cn(title(), 'stack justify-center')}>
          Todos App <Chip variant="bordered">{todos.length}</Chip>
        </h1>
        <br />
        <h2 className={subtitle({ class: 'mt-4' })}>Testing vercel Postgres database with Prisma</h2>
        <Code>{JSON.stringify(searchParams)}</Code>
        <br />
      </div>

      <TodoSearchFilters />

      <TodoCreateForm />

      <div className="w-full space-y-2">{todos?.map((todo) => <TodoItem key={todo?.id} todo={todo} />)}</div>
    </section>
  );
}
