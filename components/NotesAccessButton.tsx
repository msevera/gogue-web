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
  href = "/early-access"
}: NotesAccessButtonProps) {
  const handleClick = () => {
    trackNotesAccessClick(lectureId, lectureTitle, location);
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