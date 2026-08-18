'use client';

import Button from '@/components/Button/Button';

type ScrollToTopProps = {
  className?: string;
};

const ScrollToTop = ({ className }: ScrollToTopProps) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Button
      className={className || 'mt-6 ml-auto md:mt-8.5 md:mx-auto'}
      onClick={scrollToTop}
    >
      Наверх ↑
    </Button>
  );
};

export default ScrollToTop;
