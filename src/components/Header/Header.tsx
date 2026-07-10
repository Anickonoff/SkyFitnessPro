'use client';

import { useState } from 'react';
import Button from '../Button/Button';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import Auth from '../Auth/Auth';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [isAuthShown, setIsAuthShown] = useState<boolean>(false);
  const router = useRouter();
  const handleAuthClick = () => {
    setIsAuthShown(true);
  };
  const handleCloseAuth = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsAuthShown(false);
    }
  };
  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <header className="max-w-290 mt-10 mx-auto flex items-center justify-between px-4 md:px-6 lg:px-8 xl:px-0">
      <div className="flex gap-3.75 items-start flex-col">
        <img
          src="/images/logo.png"
          alt="Logo"
          className="h-8.75 cursor-pointer"
          onClick={handleLogoClick}
        />
        <p className="hidden md:block text-black text-lg font-normal leading-[1.1] opacity-50">
          Онлайн-тренировки для занятий дома
        </p>
      </div>
      <Button onClick={() => handleAuthClick()} size="small">
        Войти
      </Button>
      {isAuthShown && (
        <ModalWrapper onClick={(e: React.MouseEvent) => handleCloseAuth(e)}>
          <Auth closeform={() => setIsAuthShown(false)} />
        </ModalWrapper>
      )}
    </header>
  );
};

export default Header;
