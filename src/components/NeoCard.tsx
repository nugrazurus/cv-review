interface NeoCardProps {
  children: React.ReactNode;
  className?: string;
  bordered?: boolean;
  shadow?: 'neo' | 'neo-sm' | 'none';
  key?: number;
}

export function NeoCard({ children, className = '', bordered = true, shadow = 'neo', key }: NeoCardProps) {
  const borderClass = bordered ? 'border-4 border-black' : '';
  const shadowClass = shadow === 'neo' ? 'shadow-neo' : shadow === 'neo-sm' ? 'shadow-neo-sm' : '';

  return (
    <div className={`bg-white p-md ${borderClass} ${shadowClass} ${className}`} key={key}>
      {children}
    </div>
  );
}