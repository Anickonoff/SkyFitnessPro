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
      className="fixed inset-0 p-4 bg-black/20 z-50 flex justify-center items-center"
      {...props}
    >
      {children}
    </div>
  );
};

export default ModalWrapper;
