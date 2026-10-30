import React from 'react';
import { ContactButton } from './ContactButton';
import { FadeIn } from './FadeIn';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenCookies: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onOpenCookies,
}) => {
  return (
    <footer id="contact" className="relative z-20 -mt-[2px] overflow-hidden">
      {/* 1. Блок контактов и призыва к действию (Темный бархатный аметист) */}
      <div className="bg-[#16101D] pt-14 sm:pt-20 pb-4 px-6 text-center">
        <FadeIn delay={0} y={20} className="max-w-2xl mx-auto flex flex-col items-center gap-6">
          <h3 className="hero-heading font-black uppercase text-3xl sm:text-5xl md:text-6xl tracking-tight leading-tight">
            Дарите эмоции вместе с нами
          </h3>
          <p className="text-[#D7E2EA]/75 font-light text-base sm:text-lg max-w-md leading-relaxed">
            Нужна консультация флориста или хотите заказать индивидуальный букет? Мы всегда на связи и с радостью поможем.
          </p>
          <div className="pt-2">
            <ContactButton onClick={() => window.location.href = 'tel:+79675015113'} label="Связаться с нами" />
          </div>
        </FadeIn>
      </div>

      {/* 2. Широкий ультра-плавный градиентный переход без резких границ и полос */}
      <div
        className="w-full h-44 sm:h-60 md:h-72 -mt-[2px] pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, #16101D 0%, #17111E 12%, #1C1523 25%, #292031 38%, #413449 52%, #685770 66%, #9C8C9F 79%, #D1C5D2 90%, #EFE8EE 96%, #FAF4F6 100%)',
        }}
      />

      {/* 3. Юридический подвал сайта на светлом фоне по образцу */}
      <div className="bg-[#FAF4F6] text-[#22162B] pb-10 sm:pb-14 pt-4 px-6 sm:px-10 -mt-[2px] relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 text-center md:text-left">
          
          {/* Левая колонка: Бренд + розовая точка + копирайт */}
          <div className="flex flex-col items-center md:items-start gap-1.5 shrink-0">
            <div className="flex items-center gap-2">
              <span className="font-black text-xl sm:text-2xl uppercase tracking-wider text-[#1C1222]">
                BY SIEDINA
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#1C1222] inline-block shadow-sm" />
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 font-normal">
              © {new Date().getFullYear()} BY SIEDINA. Все права защищены.
            </p>
          </div>

          {/* Центральная колонка: Юридические реквизиты */}
          <div className="flex flex-col items-center justify-center gap-1 text-xs sm:text-sm text-neutral-600 font-normal max-w-md">
            <div>
              <span className="font-semibold text-neutral-800">ИП Сиедина А. В.</span>
              <span className="mx-2 text-neutral-300">|</span>
              <span>ИНН 645012345678</span>
              <span className="mx-2 text-neutral-300">|</span>
              <span>ОГРНИП 321645000012345</span>
            </div>
            <div className="text-neutral-500 text-[11px] sm:text-xs">
              г. Саратов, ул. Сакко и Ванцетти, 64 &nbsp;|&nbsp; Тел: +7 (967) 501-51-13
            </div>
          </div>

          {/* Правая колонка: Кликабельные ссылки на документы */}
          <div className="flex flex-col items-center md:items-end gap-1.5 shrink-0">
            <button
              onClick={onOpenPrivacy}
              type="button"
              className="text-xs sm:text-sm text-neutral-700 hover:text-[#1C1222] font-medium transition-colors cursor-pointer hover:underline underline-offset-2"
            >
              Политика конфиденциальности
            </button>
            <button
              onClick={onOpenCookies}
              type="button"
              className="text-xs sm:text-sm text-neutral-700 hover:text-[#1C1222] font-medium transition-colors cursor-pointer hover:underline underline-offset-2"
            >
              Правила использования cookie
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};
