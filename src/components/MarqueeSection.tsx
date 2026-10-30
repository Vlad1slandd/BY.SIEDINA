import React, { useEffect, useRef, useState } from 'react';

const BASE = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;

// Реальные фотографии и отзывы букетов цветочной студии By Siedina с Яндекс Карт
const marqueeImages = Array.from({ length: 17 }, (_, i) => `${BASE}gallery/photo-${i + 1}.jpg`);

const row1Images = marqueeImages.slice(0, 9);
const row2Images = marqueeImages.slice(9);

// Утроенные списки для бесшовной плавной прокрутки
const row1Tripled = [...row1Images, ...row1Images, ...row1Images];
const row2Tripled = [...row2Images, ...row2Images, ...row2Images];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      // Scroll offset calculated as: (window.scrollY - sectionTop + window.innerHeight) * 0.3
      const calculatedOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(calculatedOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-[#17111D] via-[#181220] to-[#1A1322] pt-8 sm:pt-12 md:pt-16 pb-6 sm:pb-8 overflow-hidden w-full select-none"
    >
      <div className="flex flex-col gap-2.5 sm:gap-3">
        {/* Row 1: Moves RIGHT on scroll */}
        <div
          className="flex gap-2.5 sm:gap-3 whitespace-nowrap"
          style={{
            transform: `translateX(${offset - 200}px)`,
            willChange: 'transform',
          }}
        >
          {row1Tripled.map((imgUrl, i) => (
            <div
              key={`row1-${i}`}
              className="flex-shrink-0 w-[260px] h-[170px] sm:w-[340px] sm:h-[220px] md:w-[420px] md:h-[270px] rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900 border border-white/5 shadow-lg group transition-transform duration-300 hover:scale-[1.02]"
            >
              <img
                src={imgUrl}
                alt="Букет студии By Siedina"
                loading="lazy"
                className="w-full h-full object-cover rounded-xl sm:rounded-2xl pointer-events-none"
              />
            </div>
          ))}
        </div>

        {/* Row 2: Moves LEFT on scroll */}
        <div
          className="flex gap-2.5 sm:gap-3 whitespace-nowrap"
          style={{
            transform: `translateX(${-(offset - 200)}px)`,
            willChange: 'transform',
          }}
        >
          {row2Tripled.map((imgUrl, i) => (
            <div
              key={`row2-${i}`}
              className="flex-shrink-0 w-[260px] h-[170px] sm:w-[340px] sm:h-[220px] md:w-[420px] md:h-[270px] rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900 border border-white/5 shadow-lg group transition-transform duration-300 hover:scale-[1.02]"
            >
              <img
                src={imgUrl}
                alt="Букет студии By Siedina"
                loading="lazy"
                className="w-full h-full object-cover rounded-xl sm:rounded-2xl pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
