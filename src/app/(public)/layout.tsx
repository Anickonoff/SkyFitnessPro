import Header from '@/components/Header/Header';
import { ReactNode } from 'react';

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default AuthLayout;
