import { Spinner } from '@heroui/spinner';

import { Heading } from '@/components/layout/Heading';
import { SubHeading } from '@/components/layout/SubHeading';

interface IProps {
  heading: string;
  subHeading?: string;
  pending?: boolean;
}

export const Page: FC<IProps> = ({ heading, subHeading, children, pending }) => (
  <section className="m-auto flex max-w-lg flex-col items-center justify-center gap-4 md:py-10">
    <header className="stack w-full justify-center">
      <Heading text={heading} />
      {pending && <Spinner className="fixed" size="lg" />}
    </header>
    <div className="inline-block max-w-lg text-center">{subHeading && <SubHeading text={subHeading} />}</div>
    {children}
  </section>
);
