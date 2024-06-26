import { Heading } from '@/components/layout/Heading';
import { SubHeading } from '@/components/layout/SubHeading';

interface IProps {
  heading: string;
  subHeading?: string;
}

export const Page: FC<IProps> = ({ heading, subHeading, children }) => (
  <section className="m-auto flex max-w-lg flex-col items-center justify-center gap-4 md:py-10">
    <div className="inline-block max-w-lg text-center">
      <Heading text={heading} />
      {subHeading && <SubHeading text={subHeading} />}
    </div>
    {children}
  </section>
);
