export const chatVariants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
    x: '20%',
    y: '20%',
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.4,
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    x: '20%',
    y: '20%',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};
