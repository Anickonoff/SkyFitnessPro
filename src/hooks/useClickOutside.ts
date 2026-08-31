import { RefObject, useEffect } from 'react';

export const useClickOutside = (
  refs: RefObject<HTMLElement | null> | RefObject<HTMLElement | null>[],
  callback: () => void,
) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      const refArray = Array.isArray(refs) ? refs : [refs];
      const isInside = refArray.some((ref) => ref.current?.contains(target));

      if (!isInside && callback) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [refs, callback]);
};
