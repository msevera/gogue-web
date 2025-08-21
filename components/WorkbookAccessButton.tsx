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
  href = "/early-access"
}: WorkbookAccessButtonProps) {
  const handleClick = () => {
    trackWorkbookAccessClick(lectureId, lectureTitle, location);
  };

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
} 