import { Code } from '@nextui-org/code';
import { Snippet } from '@nextui-org/snippet';

import { title, subtitle } from '@/components/primitives';

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg justify-center text-center">
        <h1 className={title()}>Next Prisma & Postgres</h1>
        <br />
        <h2 className={subtitle({ class: 'mt-4' })}>Testing vercel Postgres database with Prisma</h2>
      </div>
      <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="flat">
          <span>
            Get started by editing <Code color="primary">app/page.tsx</Code>
          </span>
        </Snippet>
      </div>
    </section>
  );
}
