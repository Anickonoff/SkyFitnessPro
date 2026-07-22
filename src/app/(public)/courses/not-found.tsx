'use client';

import Button from '@/components/Button/Button';
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const router = useRouter();
  const handleBtnClick = () => {
    router.push('/');
  };
  return (
    <main className="px-4 md:px-6 lg:px-8">
      <div className="flex flex-row items-start gap-7 mt-5 mx-auto max-w-290 md:mt-10 lg:mt-15">
        <h1 className="text-black text-[26px] font-medium leading-[1.1] lg:text-5xl lg:leading-none text-center">
          Такого курса нет, вернитесь на главную страницу к каталогу курсов.
        </h1>
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
