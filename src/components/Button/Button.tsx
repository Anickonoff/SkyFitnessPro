type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'default' | 'small';
  className?: string;
};

const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'default',
  className,
}: ButtonProps) => {
  const baseClasses = 'block rounded-full text-lg text-black leading-[1.1] ';
  const sizes = {
    default: 'px-6.5 py-4',
    small: 'px-4 py-2 md:px-6.5 md:py-4',
  };
  const variants = {
    primary:
      'bg-accent hover:bg-btn-prim-hover active:bg-btn-prim-active active:text-white',
    secondary: 'bg-white hover:bg-btn-sec-hover active:bg-btn-sec-active',
  };
  return (
    <button
      className={`${baseClasses} ${sizes[size]} ${variants[variant]} ${className || ''}`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};

export default Button;
