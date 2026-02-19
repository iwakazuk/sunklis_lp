import type { ReactNode } from 'react';

interface PageBackgroundProps {
  children: ReactNode;
  className?: string;
  showGradient?: boolean;
  showBlurDecorations?: boolean;
}

export default function PageBackground({
  children,
  className = '',
  showGradient = true,
  showBlurDecorations = true,
}: PageBackgroundProps) {
  const backgroundClassName = showGradient
    ? 'bg-gradient-to-b from-[var(--accent-bg-1)] via-[var(--accent-bg-2)] to-slate-100'
    : 'bg-slate-100';

  return (
    <div className={`relative overflow-hidden ${backgroundClassName} ${className}`}>
      {showBlurDecorations && (
        <>
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[var(--accent-a35)] blur-3xl"></div>
          <div className="absolute -bottom-28 -right-24 w-80 h-80 rounded-full bg-[var(--accent-a25)] blur-3xl"></div>
        </>
      )}
      {children}
    </div>
  );
}
