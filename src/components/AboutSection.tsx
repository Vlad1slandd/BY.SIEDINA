import React from 'react';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative w-full flex flex-col justify-center items-center px-4 sm:px-8 md:px-10 py-12 sm:py-16 md:py-20 bg-gradient-to-b from-[#1A1322] via-[#1E1427] to-[#22162B] overflow-hidden -mt-[2px]"
    >
      {/* Декоративное мягкое свечение по центру (легкий радиальный градиент) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[250px] sm:h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,rgba(168,85,247,0.05)_40%,transparent_70%)] rounded-full pointer-events-none" />

      {/* Central Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-2">
        {/* Heading */}
        <FadeIn delay={0} y={30}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 9vw, 130px)' }}
          >
            О нас
          </h2>
        </FadeIn>

        {/* Animated paragraph in Russian - Floral Studio */}
        <div className="mt-6 sm:mt-8 md:mt-10 w-full flex justify-center">
          <AnimatedText
            text="С более чем пятилетним опытом во флористике мы создаем авторские композиции из отборных свежих цветов, уделяя внимание каждой детали. Мы искренне любим радовать ваших близких, передавать искренние чувства и создавать букеты, которые запоминаются навсегда. Давайте дарить красоту вместе!"
            className="text-[#D7E2EA] font-medium leading-relaxed max-w-[640px] text-center text-sm sm:text-base md:text-lg"
          />
        </div>
      </div>
    </section>
  );
};
