import React from 'react';

const BASE = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;

// Реальные фотографии и отзывы букетов цветочной студии By Siedina с Яндекс Карт
const marqueeImages = Array.from({ length: 17 }, (_, i) => `${BASE}gallery/photo-${i + 1}.jpg`);

const row1Images = marqueeImages.slice(0, 9);
const row2Images = marqueeImages.slice(9);

// Дублируем списки для бесшовной плавной аппаратной прокрутки без JS-слушателей скролла
const row1Duplicated = [...row1Images, ...row1Images];
const row2Duplicated = [...row2Images, ...row2Images];

export const MarqueeSection: React.FC = () => {
  return (
    <section
      className="bg-gradient-to-b from-[#17111D] via-[#181220] to-[#1A1322] pt-8 sm:pt-12 md:pt-16 pb-6 sm:pb-8 overflow-hidden w-full select-none"
    >
      <div className="flex flex-col gap-2.5 sm:gap-3">
        {/* Ряд 1: Бесшовное аппаратное смещение влево (GPU 60/120fps) */}
        <div className="overflow-hidden w-full">
          <div className="animate-marquee-left flex gap-2.5 sm:gap-3">
            {row1Duplicated.map((imgUrl, i) => (
              <div
                key={`row1-${i}`}
                className="flex-shrink-0 w-[240px] h-[160px] sm:w-[320px] sm:h-[210px] md:w-[400px] md:h-[260px] rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900 border border-white/5 shadow-lg group transition-transform duration-300 hover:scale-[1.02]"
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
          </div>
        </div>

        {/* Ряд 2: Бесшовное аппаратное смещение вправо (GPU 60/120fps) */}
        <div className="overflow-hidden w-full">
          <div className="animate-marquee-right flex gap-2.5 sm:gap-3">
            {row2Duplicated.map((imgUrl, i) => (
              <div
                key={`row2-${i}`}
                className="flex-shrink-0 w-[240px] h-[160px] sm:w-[320px] sm:h-[210px] md:w-[400px] md:h-[260px] rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900 border border-white/5 shadow-lg group transition-transform duration-300 hover:scale-[1.02]"
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
          </div>
        </div>
      </div>
    </section>
  );
};
