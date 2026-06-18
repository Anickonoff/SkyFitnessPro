'use client';

import Button from '../Button/Button';

const Header = () => {
  return (
    <header className="max-w-290 mt-10 mx-auto flex items-center justify-between">
      <div className="flex gap-3.75 items-start flex-col">
        <img src="/images/logo.png" alt="Logo" className="h-8.75" />
        <p className="hidden md:block text-black text-lg font-normal leading-[1.1] opacity-50">
          Онлайн-тренировки для занятий дома
        </p>
      </div>
      <Button onClick={() => alert('Button clicked!')} size="small">
        Войти
      </Button>
    </header>
  );
};

export default Header;
