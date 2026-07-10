import { HTMLAttributes, ReactNode, useEffect } from 'react';

type ModalWrapperProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

const ModalWrapper = ({ children, ...props }: ModalWrapperProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      className="absolute p-4 w-screen h-screen bg-black/20 z-10 flex justify-center items-center left-0 top-0"
      {...props}
    >
      {children}
    </div>
  );
};

export default ModalWrapper;
