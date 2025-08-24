import React, { useEffect, useMemo, useRef, useState } from 'react';

export interface TypewriterProps {
  text: string | string[];
  typingSpeedMs?: number; // per character
  deletingSpeedMs?: number; // per character when deleting
  pauseBeforeDeleteMs?: number; // pause after finishing a word
  pauseBetweenWordsMs?: number; // pause before starting next word
  loop?: boolean;
  className?: string;
  cursorClassName?: string;
  showCursor?: boolean;
}

const DEFAULT_TYPING_MS = 60;
const DEFAULT_DELETING_MS = 35;
const DEFAULT_PAUSE_DELETE_MS = 1000;
const DEFAULT_PAUSE_BETWEEN_MS = 400;

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  typingSpeedMs = DEFAULT_TYPING_MS,
  deletingSpeedMs = DEFAULT_DELETING_MS,
  pauseBeforeDeleteMs = DEFAULT_PAUSE_DELETE_MS,
  pauseBetweenWordsMs = DEFAULT_PAUSE_BETWEEN_MS,
  loop = true,
  className,
  cursorClassName,
  showCursor = true,
}) => {
  const words = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);
  const [displayed, setDisplayed] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const currentWord = words[wordIndex] ?? '';

    if (!isDeleting && displayed === currentWord) {
      // Finished typing current word, pause then start deleting (if looping) or stop
      if (!loop && wordIndex === words.length - 1) {
        return; // stop animation
      }
      timeoutRef.current = window.setTimeout(() => setIsDeleting(true), pauseBeforeDeleteMs);
      return () => clearTimeout(timeoutRef.current);
    }

    if (isDeleting && displayed === '') {
      // Finished deleting, move to next word
      timeoutRef.current = window.setTimeout(() => {
        setIsDeleting(false);
        setWordIndex(prev => (prev + 1) % words.length);
      }, pauseBetweenWordsMs);
      return () => clearTimeout(timeoutRef.current);
    }

    const nextText = isDeleting
      ? currentWord.slice(0, Math.max(0, displayed.length - 1))
      : currentWord.slice(0, displayed.length + 1);

    const delay = isDeleting ? deletingSpeedMs : typingSpeedMs;
    timeoutRef.current = window.setTimeout(() => setDisplayed(nextText), delay);
    return () => clearTimeout(timeoutRef.current);
  }, [displayed, isDeleting, wordIndex, words, typingSpeedMs, deletingSpeedMs, pauseBeforeDeleteMs, pauseBetweenWordsMs, loop]);

  // Reset animation if text prop changes radically
  useEffect(() => {
    setDisplayed('');
    setWordIndex(0);
    setIsDeleting(false);
  }, [words.join('\u0000')]);

  return (
    <span className={className}>
      {displayed}
      {showCursor && (
        <span className={cursorClassName ?? 'inline-block w-[1px] h-[1em] align-[-0.2em] bg-current animate-pulse ml-0.5'} />
      )}
    </span>
  );
};

export default Typewriter;


