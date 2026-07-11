'use client';

import { ReactNode, useState } from 'react';
import { AuthModalContext } from './AuthModalContext';
import ModalWrapper from '@/components/ModalWrapper/ModalWrapper';
import Auth from '@/components/Auth/Auth';

const AuthModalProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthShown, setIsAuthShown] = useState<boolean>(false);
  const openAuthModal = () => {
    setIsAuthShown(true);
  };
  const closeAuthModal = () => {
    setIsAuthShown(false);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeAuthModal();
    }
  };
  return (
    <AuthModalContext.Provider value={{ openAuthModal, closeAuthModal }}>
      {children}
      {isAuthShown && (
        <ModalWrapper onClick={handleOverlayClick}>
          <Auth />
        </ModalWrapper>
      )}
    </AuthModalContext.Provider>
  );
};

export default AuthModalProvider;
