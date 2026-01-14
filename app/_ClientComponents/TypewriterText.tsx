'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TypewriterLoopProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  className?: string;
}

export default function TypewriterLoop({
  texts,
  typingSpeed = 60,
  deletingSpeed = 60,
  pauseTime = 1200,
  className = '',
}: TypewriterLoopProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];

    const timeout = setTimeout(
      () => {
        setDisplayedText((prev) => {
          if (!isDeleting) {
            if (prev.length < currentText.length) {
              return currentText.slice(0, prev.length + 1);
            } else {
              setTimeout(() => setIsDeleting(true), pauseTime);
              return prev;
            }
          } else {
            if (prev.length > 0) {
              return currentText.slice(0, prev.length - 1);
            } else {
              setIsDeleting(false);
              setTextIndex((prev) => (prev + 1) % texts.length);
              return '';
            }
          }
        });
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [
    displayedText,
    isDeleting,
    textIndex,
    texts,
    typingSpeed,
    deletingSpeed,
    pauseTime,
  ]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={className}
    >
      {displayedText}
      <span className="ml-1 animate-pulse">|</span>
    </motion.span>
  );
}
