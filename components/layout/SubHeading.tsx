import { subtitle } from '@/components/primitives';

interface IProps {
  text: string;
}

export const SubHeading: RC<IProps> = ({ text }) => <h2 className={subtitle({ class: 'mt-4' })}>{text}</h2>;
