interface NeoButtonProps {
  children: React.ReactNode;
  onClick?: string;
  href?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
  type?: 'button' | 'submit';
}

export function NeoButton({
  children,
  onClick,
  href,
  variant = 'primary',
  className = '',
  type = 'button'
}: NeoButtonProps) {
  const baseClasses = 'border-2 border-black shadow-neo-btn hover:shadow-neo-btn-hover active:translate-x-[4px] active:translate-y-[4px] active:shadow-none font-display font-bold px-4 py-2 transition-all inline-block text-center';
  const variantClasses = variant === 'primary'
    ? 'bg-primary text-black'
    : 'bg-white text-black hover:bg-primary';

  if (href) {
    return (
      <a href={href} className={`${baseClasses} ${variantClasses} ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onclick={onClick} className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </button>
  );
}