interface TopNavBarProps {
  currentPage?: 'landing' | 'upload' | 'results';
}

export function TopNavBar({ currentPage = 'landing' }: TopNavBarProps) {
  const navItems = [
    { label: 'Process', href: '/upload', active: currentPage === 'upload' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Dashboard', href: '/results', active: currentPage === 'results' },
  ];

  return (
    <nav className="bg-white border-b-4 border-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-gutter py-sm flex justify-between items-center">
        <a href="/" className="bg-primary text-black px-3 py-1 border-2 border-black shadow-neo-btn font-display font-bold">
          CV_REBEL
        </a>

        <div className="hidden md:flex gap-md">
          {navItems.map((item, i) => (
            <a
              key={i}
              href={item.href}
              className={`font-body text-base text-on-surface hover:text-primary-dark ${item.active ? 'border-b-4 border-primary' : ''}`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <a href="/upload" className="border-2 border-black shadow-neo-btn hover:shadow-neo-btn-hover active:translate-x-[4px] active:translate-y-[4px] active:shadow-none font-display font-bold px-4 py-2 transition-all bg-white text-black hover:bg-primary">
          Upload CV
        </a>
      </div>
    </nav>
  );
}