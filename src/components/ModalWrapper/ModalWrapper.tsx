import { HTMLAttributes, ReactNode, useEffect } from 'react';

type ModalWrapperProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  onClose?: () => void;
};

const ModalWrapper = ({ children, onClose, ...props }: ModalWrapperProps) => {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onClose) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

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
