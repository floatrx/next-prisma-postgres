import type { Variants } from 'framer-motion';

export const todoVariants: { wrapper: Variants; item: Variants } = {
  wrapper: {
    hidden: {
      opacity: 1,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
        staggerChildren: 0.03,
        when: 'beforeChildren',
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        type: 'spring',
        stiffness: 400,
        damping: 30,
        mass: 0.5,
      },
    },
  },
};
