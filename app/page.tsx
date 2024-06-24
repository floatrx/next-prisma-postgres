import { Chip } from '@nextui-org/chip';
import { cn } from '@nextui-org/theme';

import { title, subtitle } from '@/components/primitives';
import { TodoCreateForm } from '@/features/todos/components/TodoCreateForm';
import { TodoItem } from '@/features/todos/components/TodoItem';
import { TodoSearchTitleInput } from '@/features/todos/components/TodoSearchTitleInput';
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
        <h3>{JSON.stringify(searchParams)}</h3>
        <br />
        <TodoSearchTitleInput />
      </div>

      <TodoCreateForm />

      <div className="w-full space-y-2">{todos?.map((todo) => <TodoItem key={todo?.id} todo={todo} />)}</div>
    </section>
  );
}
