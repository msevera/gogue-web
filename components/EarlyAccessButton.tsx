"use client";

import { trackEarlyAccessClick } from '@/utils/analytics';

interface EarlyAccessButtonProps {
  location: string;
  element?: string;
  className?: string;
  children: React.ReactNode;
  href?: string;
}

export function EarlyAccessButton({ 
  location, 
  element = "button", 
  className = "", 
  children,
  href = "https://docs.google.com/forms/d/e/1FAIpQLSfm22rOLcPKyxMFlCI2OGCIcJbjeNDaHVI8Prp76AW0D0Wpnw/viewform?usp=dialog"
}: EarlyAccessButtonProps) {
  const handleClick = () => {
    trackEarlyAccessClick(location, element);
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
} 