'use client';

import { useRef, useState } from 'react';
import Button from '../Button/Button';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useAuthModal } from '@/hooks/useAuthModal';
import { toast } from 'sonner';
import Image from 'next/image';
import Link from 'next/link';
import { useClickOutside } from '@/hooks/useClickOutside';

type HeaderPropsType = {
  privatePage?: boolean;
};

const Header = ({ privatePage = false }: HeaderPropsType) => {
  const { isAuthenticated, logout, user } = useAuth();
  const [isUserPopUpShown, setIsUserPopUpShown] = useState<boolean>(false);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const userPopUpRef = useRef<HTMLDivElement>(null);
  const { openAuthModal } = useAuthModal();

  const router = useRouter();

  const handleProfileClick = () => {
    setIsUserPopUpShown((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
    toast.info('Вы вышли из учётной записи!', { id: 'auth-logout' });
  };

  useClickOutside([profileButtonRef, userPopUpRef], () => {
    setIsUserPopUpShown(false);
  });

  return (
    <header className="relative max-w-290 mt-10 mx-auto flex items-start justify-between px-4 md:px-6 lg:px-8 xl:px-0">
      <div className="flex gap-3.75 items-start flex-col">
        <Link href="/">
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width={223}
            height={36}
            className="h-8.75 cursor-pointer w-auto"
          />
        </Link>
        {!privatePage && (
          <p className="hidden md:block text-black text-lg font-normal leading-[1.1] opacity-50">
            Онлайн-тренировки для занятий дома
          </p>
        )}
      </div>
      {isAuthenticated ? (
        <button
          ref={profileButtonRef}
          className="flex flex-row items-center relative cursor-pointer"
          onClick={handleProfileClick}
          type="button"
          aria-haspopup="true"
          aria-expanded={isUserPopUpShown}
          aria-label="Меню профиля"
        >
          <Image
            src="/images/header-photo.png"
            alt="Аватар пользователя"
            className="h-9 w-auto md:h-12.5 mr-2.5 md:mr-4"
            height={50}
            width={50}
          />
          <span className="hidden md:block text-2xl lining-nums proportional-nums leading-[1.1] mr-3">
            {user?.name}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="7"
            viewBox="0 0 10 7"
            fill="none"
          >
            <path
              d="M8.70715 0.707031L4.70715 4.70703L0.707153 0.707031"
              stroke="black"
              strokeWidth="2"
            />
          </svg>
        </button>
      ) : (
        <Button onClick={openAuthModal} size="small">
          Войти
        </Button>
      )}
      {isUserPopUpShown && (
        <div
          ref={userPopUpRef}
          className="absolute right-0 top-full z-20 p-7.5 flex flex-col items-center gap-8.5 rounded-[30px] bg-white shadow-card"
        >
          <div className="flex flex-col items-center gap-2.5 text-lg leading-[1.1]">
            <p className="text-black">{user?.name}</p>
            <p className="text-text-inactive">{user?.email}</p>
          </div>
          <div className="flex flex-col items-center gap-2.5 w-full">
            <Button onClick={() => router.push('/profile')} className="w-full">
              Мой профиль
            </Button>
            <Button
              variant="secondary"
              className="w-full"
              onClick={handleLogout}
            >
              Выйти
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
