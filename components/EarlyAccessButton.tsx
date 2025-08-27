"use client";

import { trackEarlyAccessClick } from '@/utils/analytics';

interface EarlyAccessButtonProps {
  location: string;
  element?: string;
  className?: string;
  children: React.ReactNode;
  href?: string;
  ariaLabel?: string;
}

export function EarlyAccessButton({ 
  location, 
  element = "button", 
  className = "", 
  children,
  href = "/early-access",
  ariaLabel
}: EarlyAccessButtonProps) {
  const handleClick = () => {
    trackEarlyAccessClick(location, element);
  };

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
} 