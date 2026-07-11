'use client';

import Header from '@/components/Header/Header';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    router.push('/');
  }
  //TODO вместо перехода на главную страницу сделать уведомление о необходимости авторизации
  return (
    <>
      <Header privatePage={true} />
      {children}
    </>
  );
};

export default AuthLayout;
