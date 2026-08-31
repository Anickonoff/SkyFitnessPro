interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'default' | 'small';
  className?: string;
}

const Button = ({
  variant = 'primary',
  size = 'default',
  className,
  type = 'button',
  children,
  ...props
}: ButtonProps) => {
  const baseClasses =
    'block rounded-full text-lg text-black leading-[1.1] cursor-pointer';
  const sizes = {
    default: 'px-6.5 py-4',
    small: 'px-4 py-2 md:px-6.5 md:py-4',
  };
  const variants = {
    primary:
      'bg-accent hover:bg-btn-prim-hover active:bg-btn-prim-active active:text-white disabled:bg-btn-prim-inactive disabled:text-text-inactive ',
    secondary:
      'border bg-white hover:bg-btn-sec-hover active:bg-btn-sec-active disabled:bg-btn-sec-inactive disabled:text-text-inactive disabled:border-btn-sec-border-inactive',
  };
  return (
    <button
      className={`${baseClasses} ${sizes[size]} ${variants[variant]} ${className || ''}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
