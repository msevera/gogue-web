'use client';

import { useEffect, useMemo, useState } from 'react';

interface AnimatedTextProps {
  sentences?: string[];
  phrases?: string[]; // backward compatibility
  className?: string;
  typingDelayRangeMs?: [number, number];
  deletingDelayRangeMs?: [number, number];
  pauseBetweenMs?: number;
  loop?: boolean;
  showCaret?: boolean;
}

export function AnimatedText({
  sentences,
  phrases,
  className = '',
  typingDelayRangeMs = [40, 120],
  deletingDelayRangeMs = [20, 60],
  pauseBetweenMs = 2000,
  loop = true,
  showCaret = true,
}: AnimatedTextProps) {
  const items = useMemo(() => (sentences && sentences.length > 0 ? sentences : phrases ?? []), [sentences, phrases]);

  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [displayed, setDisplayed] = useState(() => (items.length > 0 ? items[0] : ''));
  const [isDeleting, setIsDeleting] = useState(false);

  const longestSentence = useMemo(() => {
    return items.reduce((longest, current) => (current.length > longest.length ? current : longest), '');
  }, [items]);

  useEffect(() => {
    if (items.length === 0) return;

    const fullSentence = items[sentenceIndex] ?? '';

    const getRandomDelay = (range: [number, number]) => {
      const [min, max] = range;
      const boundedMin = Math.max(0, Math.min(min, max));
      const boundedMax = Math.max(min, max);
      return Math.floor(Math.random() * (boundedMax - boundedMin + 1)) + boundedMin;
    };

    // If not looping and we're at the last sentence, finish typing and stop
    if (!loop && sentenceIndex === items.length - 1 && !isDeleting && displayed.length === fullSentence.length) {
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    if (!isDeleting && displayed.length < fullSentence.length) {
      // Type next character
      timeoutId = setTimeout(() => {
        setDisplayed(fullSentence.slice(0, displayed.length + 1));
      }, getRandomDelay(typingDelayRangeMs));
    } else if (!isDeleting && displayed.length === fullSentence.length) {
      // Pause at the end of the sentence
      timeoutId = setTimeout(() => {
        if (items.length === 1 && !loop) {
          return; // stop entirely
        }
        if (items.length === 1 && loop) {
          // single item loop: delete then retype
          setIsDeleting(true);
        } else {
          setIsDeleting(true);
        }
      }, pauseBetweenMs);
    } else if (isDeleting && displayed.length > 0) {
      // Delete previous character
      timeoutId = setTimeout(() => {
        setDisplayed(fullSentence.slice(0, displayed.length - 1));
      }, getRandomDelay(deletingDelayRangeMs));
    } else if (isDeleting && displayed.length === 0) {
      // Move to next sentence
      timeoutId = setTimeout(() => {
        setIsDeleting(false);
        setSentenceIndex((prev) => (prev + 1) % items.length);
      }, 200);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [displayed, isDeleting, sentenceIndex, items, typingDelayRangeMs, deletingDelayRangeMs, pauseBetweenMs, loop]);

  // Reset when sentences list changes
  useEffect(() => {
    setSentenceIndex(0);
    setDisplayed(items.length > 0 ? items[0] : '');
    setIsDeleting(false);
  }, [items]);

  if (items.length === 0) {
    return null;
  }

  return (
    <span className={`relative inline-block max-w-full whitespace-pre-wrap md:whitespace-nowrap ${className}`}>
      <span className="invisible block break-words max-w-full" aria-hidden="true">{longestSentence}</span>
      <span className="absolute inset-0 block max-w-full break-words">
        <span>{displayed}</span>
        {showCaret && (
          <span aria-hidden="true" className="ml-0.5 inline-block h-[1em] w-px bg-current animate-pulse" />
        )}
      </span>
    </span>
  );
}
