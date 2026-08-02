import { AuthModalContext } from '@/context/AuthModalContext';
import { useContext } from 'react';

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);

  if (!context) {
    throw new Error(
      'useAuthModal должен использоваться внутри AuthModalProvider',
    );
  }

  return context;
};
