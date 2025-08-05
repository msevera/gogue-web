"use client";

import { trackWorkbookAccessClick } from '@/utils/analytics';

interface WorkbookAccessButtonProps {
  lectureId: string;
  lectureTitle: string;
  location: string;
  className?: string;
  children: React.ReactNode;
  href?: string;
}

export function WorkbookAccessButton({ 
  lectureId,
  lectureTitle,
  location,
  className = "",
  children,
  href = "https://docs.google.com/forms/d/e/1FAIpQLSfm22rOLcPKyxMFlCI2OGCIcJbjeNDaHVI8Prp76AW0D0Wpnw/viewform?usp=dialog"
}: WorkbookAccessButtonProps) {
  const handleClick = () => {
    trackWorkbookAccessClick(lectureId, lectureTitle, location);
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