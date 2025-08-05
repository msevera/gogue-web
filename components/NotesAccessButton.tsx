"use client";

import { trackNotesAccessClick } from '@/utils/analytics';

interface NotesAccessButtonProps {
  lectureId: string;
  lectureTitle: string;
  location: string;
  className?: string;
  children: React.ReactNode;
  href?: string;
}

export function NotesAccessButton({ 
  lectureId,
  lectureTitle,
  location,
  className = "",
  children,
  href = "https://docs.google.com/forms/d/e/1FAIpQLSfm22rOLcPKyxMFlCI2OGCIcJbjeNDaHVI8Prp76AW0D0Wpnw/viewform?usp=dialog"
}: NotesAccessButtonProps) {
  const handleClick = () => {
    trackNotesAccessClick(lectureId, lectureTitle, location);
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