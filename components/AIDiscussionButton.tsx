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
  href = "/early-access"
}: AIDiscussionButtonProps) {
  const handleClick = () => {
    trackAIDiscussionClick(lectureId, lectureTitle, location);
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