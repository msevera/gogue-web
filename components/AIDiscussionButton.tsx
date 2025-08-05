"use client";

import { trackAIDiscussionClick } from '@/utils/analytics';

interface AIDiscussionButtonProps {
  lectureId: string;
  lectureTitle: string;
  location: string;
  className?: string;
  children: React.ReactNode;
  href?: string;
}

export function AIDiscussionButton({ 
  lectureId,
  lectureTitle,
  location,
  className = "",
  children,
  href = "https://docs.google.com/forms/d/e/1FAIpQLSfm22rOLcPKyxMFlCI2OGCIcJbjeNDaHVI8Prp76AW0D0Wpnw/viewform?usp=dialog"
}: AIDiscussionButtonProps) {
  const handleClick = () => {
    trackAIDiscussionClick(lectureId, lectureTitle, location);
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