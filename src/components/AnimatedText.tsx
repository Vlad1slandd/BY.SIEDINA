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
  const opacity = useTransform(progress, range, [0.28, 1]);
  const color = useTransform(progress, range, ['#7B6F82', '#FFFFFF']);

  return (
    <span className="relative inline-block mx-1">
      <span className="opacity-0">{word}</span>
      <motion.span
        style={{ opacity, color }}
        className="absolute inset-0 transition-colors"
      >
        {word}
      </motion.span>
    </span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  // Подсвечивание завершается уже к середине экрана (end 0.5)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.92', 'end 0.50'],
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
        const end = Math.min(1, start + (1 / totalWords) * 1.8);

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
