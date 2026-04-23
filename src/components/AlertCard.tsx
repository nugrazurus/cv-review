interface AlertCardProps {
  children: React.ReactNode;
  variant?: 'warning' | 'error';
  className?: string;
}

export function AlertCard({ children, variant = 'warning', className = '' }: AlertCardProps) {
  return (
    <div className={`bg-alert-orange border-4 border-black shadow-neo p-md text-white rotate-1 hover:rotate-0 transition-transform ${className}`}>
      <div className="flex items-start gap-sm">
        <span className="material-symbols-outlined text-2xl">warning</span>
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}