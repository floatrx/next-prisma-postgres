import { cn } from '@nextui-org/theme';

import { title } from '@/components/primitives';

interface IProps {
  text: string;
}

export const Heading: RC<IProps> = ({ text }) => <h1 className={cn(title(), 'stack justify-center')}>{text}</h1>;
