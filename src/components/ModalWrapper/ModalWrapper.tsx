import { ReactNode } from 'react';

type ModalWrapperProps = {
  children: ReactNode;
};

const ModalWrapper = ({ children }: ModalWrapperProps) => {
  return (
    <div className="absolute p-4 w-screen h-screen bg-black bg-opacity-50 z-10 flex justify-center items-center">
      {children}
    </div>
  );
};

export default ModalWrapper;
