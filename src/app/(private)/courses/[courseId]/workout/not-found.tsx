'use client';

import Button from '@/components/Button/Button';
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const router = useRouter();
  const handleBtnClick = () => {
    router.push('/profile');
  };
  return (
    <main className="px-4 md:px-6 lg:px-8">
      <div className="flex flex-col items-start gap-7 mt-5 mx-auto max-w-290 md:mt-10 lg:mt-15">
        <h1 className="text-black text-[26px] font-medium leading-[1.1] lg:text-5xl lg:leading-none text-center w-full">
          Тренировка не найдена
        </h1>
        <p className="text-lg text-center w-full">
          Такой тренировки нет в выбранном курсе.
        </p>
      </div>
      <Button
        className="mt-6 ml-auto md:mt-8.5 md:mx-auto"
        onClick={handleBtnClick}
      >
        Вернуться в профиль
      </Button>
    </main>
  );
};

export default NotFound;
