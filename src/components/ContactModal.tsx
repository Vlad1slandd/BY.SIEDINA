import React from 'react';
import { X, MessageCircle, Send, Phone, MapPin, Clock, Flower2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-gradient-to-b from-[#1C1424] via-[#170E1E] to-[#120817] text-[#EDE4EA] rounded-3xl p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.85)] border border-white/10 flex flex-col my-auto overflow-hidden animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Фоновые декоративные свечения */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Шапка модального окна */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#BBCCD7] mb-2">
          <Flower2 className="w-4 h-4 text-[#EAD6E2]" />
          <span>Студия By Siedina</span>
        </div>

        <h3 className="hero-heading font-black uppercase text-2xl sm:text-3xl tracking-tight leading-tight mb-2">
          Связаться с нами
        </h3>
        <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-6">
          Выберите удобный способ связи. Мы всегда рады проконсультировать вас, помочь с выбором цветов и принять заказ.
        </p>

        {/* Каналы связи */}
        <div className="flex flex-col gap-3">
          {/* Telegram */}
          <a
            href="https://t.me/by_siedina_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-sky-400/40 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-sky-500/15 border border-sky-400/30 text-sky-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Send className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm sm:text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                  Открыть Telegram-бота
                </span>
                <span className="text-xs text-neutral-400 font-light">
                  @by_siedina_bot • прием заказов
                </span>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white/5 text-neutral-300 group-hover:text-white">
              Открыть →
            </span>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/79675015113"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400/40 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                  Написать в WhatsApp
                </span>
                <span className="text-xs text-neutral-400 font-light">
                  +7 (967) 501-51-13 • онлайн-чат
                </span>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white/5 text-neutral-300 group-hover:text-white">
              Открыть →
            </span>
          </a>

          {/* Телефонный звонок */}
          <a
            href="tel:+79675015113"
            className="group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-purple-500/15 border border-purple-400/30 text-[#EAD6E2] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm sm:text-base font-bold text-white group-hover:text-[#EAD6E2] transition-colors">
                  Позвонить флористу
                </span>
                <span className="text-xs text-neutral-400 font-light">
                  +7 (967) 501-51-13
                </span>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white/5 text-neutral-300 group-hover:text-white">
              Вызов →
            </span>
          </a>
        </div>

        {/* Адрес и график студии */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-col gap-2 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
            <span>г. Саратов, ул. Сакко и Ванцетти, 64</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-neutral-400 shrink-0" />
            <span>Ежедневно с 09:00 до 21:00</span>
          </div>
        </div>
      </div>
    </div>
  );
};
