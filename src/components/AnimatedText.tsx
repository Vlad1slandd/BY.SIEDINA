import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

interface WordProps {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const AnimatedWord: React.FC<WordProps> = ({ word, progress, range }) => {
  const opacity = useTransform(progress, range, [0.25, 1]);

  return (
    <span className="relative inline-block mx-1">
      <span className="opacity-0">{word}</span>
      <motion.span
        style={{ opacity }}
        className="absolute inset-0"
      >
        {word}
      </motion.span>
    </span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.25'],
  });

  const words = useMemo(() => text.split(/\s+/), [text]);
  const totalWords = words.length;

  return (
    <p
      ref={containerRef}
      className={`relative flex flex-wrap justify-center text-center ${className}`}
      style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
    >
      {words.map((word, index) => {
        const start = index / totalWords;
        const end = Math.min(1, start + 0.15);

        return (
          <AnimatedWord
            key={index}
            word={word}
            progress={scrollYProgress}
            range={[start, end]}
          />
        );
      })}
    </p>
  );
};
