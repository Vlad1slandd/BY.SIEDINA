import React from 'react';
import { Cookie } from 'lucide-react';

interface CookieBannerProps {
  onAcceptAll: () => void;
  onOpenDetails: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({
  onAcceptAll,
  onOpenDetails,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-5 pointer-events-none animate-slideUp">
      <div className="max-w-6xl mx-auto bg-[#1C1424]/95 text-[#EDE4EA] backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.85)] border border-white/10 pointer-events-auto flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 relative overflow-hidden">
        {/* Верхняя тонкая декоративная линия из палитры сайта */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

        {/* Текст уведомления с иконкой */}
        <div className="flex items-start sm:items-center gap-3.5 flex-1">
          <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#D7E2EA] mt-0.5 sm:mt-0">
            <Cookie className="w-5 h-5" />
          </div>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light text-left">
            Мы используем необходимые технические и обезличенные аналитические файлы cookie для работы интерактивного
            калькулятора и корректного функционирования сайта в соответствии с законодательством РФ. Ознакомьтесь с
            подробными правилами в нашей{' '}
            <button
              onClick={onOpenDetails}
              type="button"
              className="text-white hover:text-[#BBCCD7] font-semibold underline underline-offset-4 transition-colors cursor-pointer"
            >
              Политике использования файлов Cookie
            </button>
            .
          </p>
        </div>

        {/* Кнопки действий: фирменная белая кнопка + стеклянный контур */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-end shrink-0">
          <button
            onClick={onAcceptAll}
            type="button"
            className="flex-1 md:flex-initial px-6 py-2.5 sm:py-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold uppercase tracking-wider text-xs sm:text-sm shadow-lg hover:shadow-white/20 transition-all active:scale-95 cursor-pointer"
          >
            Принять
          </button>
          <button
            onClick={onOpenDetails}
            type="button"
            className="flex-1 md:flex-initial px-5 py-2.5 sm:py-3 rounded-xl border border-white/15 hover:border-white/35 bg-white/5 hover:bg-white/10 text-neutral-200 hover:text-white font-bold uppercase tracking-wider text-xs sm:text-sm transition-all active:scale-95 cursor-pointer"
          >
            Подробнее
          </button>
        </div>
      </div>
    </div>
  );
};
