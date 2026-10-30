import React, { useState } from 'react';
import { FadeIn } from './FadeIn';
import { ContactButton } from './ContactButton';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ContactModal } from './ContactModal';

export const HeroSection: React.FC = () => {
  const { totalCount, openCart } = useCart();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'О нас', id: 'about' },
    { label: 'Услуги', id: 'services' },
    { label: 'Проекты', id: 'projects' },
    { label: 'Контакты', id: 'contact' },
  ];

  return (
    <section className="relative min-h-[100dvh] h-[100dvh] w-full flex flex-col justify-between overflow-x-clip bg-gradient-to-b from-[#140F17] via-[#151019] to-[#17111D]">
      {/* Мягкое фоновое цветочное свечение (аппаратно-ускоренный радиальный градиент) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] pointer-events-none -z-10" />
      
      {/* Navbar */}
      <FadeIn as="nav" delay={0} y={-20} className="w-full z-20">
        <div className="flex justify-between items-center w-full px-5 sm:px-8 md:px-14 lg:px-20 pt-5 sm:pt-7 md:pt-9 gap-3 sm:gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="group relative py-2 text-[#EDE4EA] hover:text-white font-bold uppercase tracking-wider text-sm sm:text-lg md:text-xl lg:text-[1.65rem] xl:text-[1.85rem] transition-colors duration-300 cursor-pointer whitespace-nowrap"
            >
              <span>{item.label}</span>
              {/* Плавное элегантное подчеркивание при наведении */}
              <span className="absolute bottom-0 left-0 w-0 h-[2.5px] sm:h-[3px] bg-gradient-to-r from-[#EAD6E2] via-white to-[#C2D1DC] transition-all duration-300 ease-out group-hover:w-full rounded-full shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
            </button>
          ))}

          {/* Иконка корзины в шапке */}
          <button
            onClick={openCart}
            className="relative p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all hover:scale-105 active:scale-95 cursor-pointer ml-1"
            title="Открыть корзину"
            aria-label="Корзина"
          >
            <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white text-black text-[10px] font-black flex items-center justify-center shadow-md">
                {totalCount}
              </span>
            )}
          </button>
        </div>
      </FadeIn>

      {/* Hero Heading: "Привет, мы By Siedina!" - Responsive & Never Clipped */}
      <div className="w-full text-center z-10 select-none my-auto flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
        <FadeIn delay={0.15} y={40} className="w-full flex flex-col items-center justify-center">
          <h1 className="hero-heading font-black uppercase tracking-tight text-center w-full flex flex-col items-center justify-center">
            {/* Line 1: Привет, мы */}
            <span className="block text-[10vw] xs:text-[9.5vw] sm:text-[8vw] md:text-[7vw] lg:text-[6.5vw] xl:text-[7vw] leading-[1.05]">
              Привет, мы
            </span>
            {/* Line 2: By Siedina! with exclamation mark prominently included */}
            <span className="block text-[12.5vw] xs:text-[11.8vw] sm:text-[10vw] md:text-[8.8vw] lg:text-[8.2vw] xl:text-[8.8vw] leading-[1.05] mt-1 sm:mt-2">
              By Siedina!
            </span>
          </h1>
        </FadeIn>
      </div>

      {/* Bottom Bar: Текст и кнопка строго по центру */}
      <div className="w-full flex flex-col items-center justify-center text-center gap-4 sm:gap-6 px-4 sm:px-6 md:px-10 pb-8 sm:pb-10 md:pb-12 z-20">
        {/* Информационный текст по центру */}
        <FadeIn delay={0.35} y={20} className="w-full flex justify-center text-center">
          <p
            className="pearl-shimmer-text font-semibold sm:font-bold uppercase tracking-[0.1em] sm:tracking-[0.14em] leading-relaxed text-center max-w-[340px] sm:max-w-[500px] md:max-w-[640px]"
            style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.45rem)' }}
          >
            студия цветов, создающая яркие и незабываемые букеты
          </p>
        </FadeIn>

        {/* Кнопка строго по центру: открывает модальное окно контактов без скролла в подвал */}
        <FadeIn delay={0.5} y={20} className="w-full flex justify-center items-center">
          <ContactButton onClick={() => setIsContactModalOpen(true)} label="Связаться с нами" />
        </FadeIn>
      </div>

      {/* Модальное окно прямых контактов (Telegram, WhatsApp, Звонок) */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </section>
  );
};
