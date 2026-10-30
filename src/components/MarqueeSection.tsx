import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const BASE = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;

// 17 оригинальных фотографий букетов студии By Siedina с Яндекс Карт
const marqueeImages = Array.from({ length: 17 }, (_, i) => `${BASE}gallery/photo-${i + 1}.jpg`);

const row1 = marqueeImages.slice(0, 9);
const row2 = marqueeImages.slice(9);

// 12 изображений в каждом ряду — покрывает любые экраны до 4K без пустот и без лишней нагрузки на память
const row1List = [...row1, ...row1.slice(0, 3)];
const row2List = [...row2, ...row2.slice(0, 4)];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Высокопроизводительный скролл-параллакс напрямую через Framer Motion GPU-композитор (без React re-renders)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Ряд 1: плавно выезжает вправо при опускании страницы вниз
  const x1 = useTransform(scrollYProgress, [0, 1], [-300, 0]);

  // Ряд 2: плавно выезжает влево при опускании страницы вниз
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -300]);

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-[#17111D] via-[#181220] to-[#1A1322] pt-8 sm:pt-12 md:pt-16 pb-6 sm:pb-8 overflow-hidden w-full select-none"
    >
      <div className="flex flex-col gap-2.5 sm:gap-3">
        {/* Ряд 1: выезжает вправо по мере опускания страницы */}
        <div className="overflow-hidden w-full">
          <motion.div
            style={{ x: x1 }}
            className="flex gap-2.5 sm:gap-3 whitespace-nowrap will-change-transform"
          >
            {row1List.map((imgUrl, i) => (
              <div
                key={`row1-${i}`}
                className="flex-shrink-0 w-[240px] h-[160px] sm:w-[320px] sm:h-[210px] md:w-[400px] md:h-[260px] rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900 border border-white/5 shadow-md group transition-transform duration-300 hover:scale-[1.02]"
              >
                <img
                  src={imgUrl}
                  alt="Букет студии By Siedina"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover rounded-xl sm:rounded-2xl pointer-events-none"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Ряд 2: выезжает влево по мере опускания страницы */}
        <div className="overflow-hidden w-full">
          <motion.div
            style={{ x: x2 }}
            className="flex gap-2.5 sm:gap-3 whitespace-nowrap will-change-transform"
          >
            {row2List.map((imgUrl, i) => (
              <div
                key={`row2-${i}`}
                className="flex-shrink-0 w-[240px] h-[160px] sm:w-[320px] sm:h-[210px] md:w-[400px] md:h-[260px] rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900 border border-white/5 shadow-md group transition-transform duration-300 hover:scale-[1.02]"
              >
                <img
                  src={imgUrl}
                  alt="Букет студии By Siedina"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover rounded-xl sm:rounded-2xl pointer-events-none"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
