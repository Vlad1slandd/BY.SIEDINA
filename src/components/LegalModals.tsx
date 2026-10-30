import React from 'react';
import { X, Check, ShieldCheck, Cookie } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  tag?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const BaseModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  title,
  tag = 'ЮРИДИЧЕСКИЙ ДОКУМЕНТ',
  icon,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-gradient-to-b from-[#1E1527] via-[#1A1222] to-[#140D1B] text-[#EDE4EA] rounded-3xl p-6 sm:p-10 shadow-[0_20px_70px_rgba(0,0,0,0.85)] border border-white/10 max-h-[90vh] flex flex-col my-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Декоративное мягкое фоновое свечение в тонах сайта */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-7 sm:right-7 w-10 h-10 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Заголовок документа */}
        <div className="pr-12 mb-6">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#BBCCD7] mb-1.5">
            {icon}
            <span>{tag}</span>
          </div>
          <h2 className="hero-heading font-black text-2xl sm:text-3xl tracking-tight leading-tight">
            {title}
          </h2>
        </div>

        {/* Скроллируемое тело */}
        <div className="overflow-y-auto pr-2 space-y-5 text-sm sm:text-base text-neutral-300 leading-relaxed font-light scrollbar-thin scrollbar-thumb-white/10">
          {children}
        </div>
      </div>
    </div>
  );
};

// 1. Политика конфиденциальности
export const PrivacyPolicyModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Политика обработки персональных данных"
      tag="Конфиденциальность & Безопасность"
      icon={<ShieldCheck className="w-4 h-4 text-[#BBCCD7]" />}
    >
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 text-xs sm:text-sm space-y-1.5 text-neutral-300">
        <p className="font-bold text-[#BBCCD7] uppercase tracking-wider text-xs">Оператор персональных данных:</p>
        <p className="font-semibold text-white text-sm">Индивидуальный предприниматель Сиедина А. В.</p>
        <p className="text-neutral-400">ИНН: 645012345678 &nbsp;|&nbsp; ОГРНИП: 321645000012345</p>
        <p className="text-neutral-400">Адрес студии: г. Саратов, ул. Сакко и Ванцетти, 64</p>
        <p className="text-neutral-400">
          E-mail:{' '}
          <a href="mailto:bysiedina@gmail.com" className="text-[#D7E2EA] hover:text-white underline transition-colors">
            bysiedina@gmail.com
          </a>{' '}
          &nbsp;|&nbsp; Тел:{' '}
          <a href="tel:+79675015113" className="text-[#D7E2EA] hover:text-white underline transition-colors">
            +7 (967) 501-51-13
          </a>
        </p>
      </div>

      <section>
        <h3 className="font-bold text-white text-base sm:text-lg mb-2">1. Общие положения</h3>
        <p>
          Настоящая Политика обработки персональных данных составлена в соответствии с Федеральным законом от
          27.07.2006 № 152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры
          по обеспечению их безопасности, предпринимаемые ИП Сиедина А. В. (далее — Оператор).
        </p>
        <p className="mt-2">
          1.1. Оператор ставит важнейшей целью своей деятельности соблюдение прав и свобод человека при обработке
          его персональных данных, в том числе защиты прав на неприкосновенность частной жизни, личную и семейную тайну.
        </p>
        <p className="mt-2">
          1.2. Настоящая Политика применяется ко всей информации, которую Оператор может получить о посетителях веб-сайта by-siedina.ru.
        </p>
      </section>

      <section>
        <h3 className="font-bold text-white text-base sm:text-lg mb-2">2. Состав и категории обрабатываемых данных</h3>
        <p>Оператор может обрабатывать следующие данные Пользователя:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1 text-neutral-300">
          <li>Имя и контактный номер телефона (для связи, подтверждения заказа букета, консультации флориста);</li>
          <li>Адрес доставки и пожелания к букету (состав цветов, упаковка, текст поздравительной открытки);</li>
          <li>Обезличенные данные о посетителях (в т.ч. файлы cookie, IP-адреса, данные о браузере и геопозиции) с использованием метрической программы Яндекс Метрика.</li>
        </ul>
      </section>

      <section>
        <h3 className="font-bold text-white text-base sm:text-lg mb-2">3. Цели обработки данных</h3>
        <p>Персональные данные Пользователя обрабатываются исключительно в целях:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1 text-neutral-300">
          <li>Консультации Пользователя по услугам авторской флористики, букетам и цветочному оформлению событий;</li>
          <li>Расчета стоимости индивидуального букета в интерактивном онлайн-калькуляторе и оформления бережной доставки;</li>
          <li>Предоставления обратной связи, обработки входящих заявок и информирования о сезонных поставках цветов;</li>
          <li>Сбора аналитической статистики для оптимизации скорости и удобства работы веб-сайта.</li>
        </ul>
      </section>

      <section>
        <h3 className="font-bold text-white text-base sm:text-lg mb-2">4. Условия обработки и передача третьим лицам</h3>
        <p>
          4.1. Обработка персональных данных осуществляется с согласия Пользователя, выражаемого путем отправки контактной формы, оформления заказа через мессенджеры или согласия с правилами cookie.
        </p>
        <p className="mt-2">
          4.2. Оператор принимает необходимые правовые, организационные и технические меры для защиты персональных данных от неправомерного доступа, изменения или раскрытия.
        </p>
        <p className="mt-2">
          4.3. Персональные данные Пользователя не передаются третьим лицам без его согласия, за исключением случаев, предусмотренных законодательством РФ (например, по официальному запросу правоохранительных органов) или службе курьерской доставки исключительно для вручения букета получателю.
        </p>
      </section>

      <section>
        <h3 className="font-bold text-white text-base sm:text-lg mb-2">5. Права Пользователя</h3>
        <p>
          Пользователь имеет право в любой момент отозвать свое согласие на обработку данных, направить запрос на их уточнение, блокирование или уничтожение, написав на электронную почту:{' '}
          <a href="mailto:bysiedina@gmail.com" className="text-[#D7E2EA] hover:text-white underline transition-colors">
            bysiedina@gmail.com
          </a>.
        </p>
      </section>
    </BaseModal>
  );
};

// 2. Модальное окно Cookie с предпочтениями
export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: CookiePreferences;
  onSavePreferences: (prefs: CookiePreferences) => void;
}

export const CookieSettingsModal: React.FC<CookieModalProps> = ({
  isOpen,
  onClose,
  preferences,
  onSavePreferences,
}) => {
  const [localPrefs, setLocalPrefs] = React.useState<CookiePreferences>(preferences);

  React.useEffect(() => {
    setLocalPrefs(preferences);
  }, [preferences, isOpen]);

  const handleSave = () => {
    onSavePreferences(localPrefs);
    onClose();
  };

  const handleAllowAll = () => {
    const allEnabled = { necessary: true, analytics: true, marketing: true };
    setLocalPrefs(allEnabled);
    onSavePreferences(allEnabled);
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Положение об использовании файлов cookie"
      tag="Параметры конфиденциальности"
      icon={<Cookie className="w-4 h-4 text-[#BBCCD7]" />}
    >
      <div className="space-y-4">
        <p>
          Файлы cookie (куки) — это небольшие текстовые файлы, сохраняемые на вашем устройстве при посещении сайтов.
          Они помогают сайту запоминать настройки и параметры конфиденциальности.
        </p>

        <div>
          <h3 className="font-bold text-white text-base sm:text-lg mb-1">1. Зачем мы используем cookie?</h3>
          <p>
            Мы используем файлы cookie для обеспечения технической работоспособности нашего сайта, ускорения загрузки
            страниц, стабильной работы интерактивного калькулятора букетов, анализа поведения пользователей и повышения удобства использования. Все собираемые данные являются обезличенными.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-white text-base sm:text-lg mb-1">2. Какие категории cookie мы используем?</h3>
          <ul className="list-disc pl-5 space-y-1 text-neutral-300">
            <li><strong className="text-white">Технические (обязательные):</strong> необходимы для работы основных функций сайта и калькулятора. Их отключение невозможно, так как это нарушит нормальное функционирование сайта.</li>
            <li><strong className="text-white">Аналитические (дополнительные):</strong> используются для подсчета посещений страниц и анализа источников трафика с помощью сервиса Яндекс.Метрика. Вы можете настроить их использование ниже.</li>
            <li><strong className="text-white">Маркетинговые (дополнительные):</strong> помогают оценивать эффективность наших предложений в Яндексе.</li>
          </ul>
        </div>

        {/* 3. НАСТРОИТЬ ПРЕДПОЧТЕНИЯ */}
        <div className="pt-4 border-t border-white/10">
          <h3 className="hero-heading font-black text-lg sm:text-xl mb-4">
            3. Настроить предпочтения:
          </h3>

          <div className="space-y-3">
            {/* Карточка 1: Обязательные (всегда включено) */}
            <div className="bg-white/[0.04] text-[#EDE4EA] rounded-2xl p-4 sm:p-5 flex items-start justify-between gap-4 border border-white/10 shadow-sm">
              <div className="space-y-1">
                <h4 className="font-bold text-base text-white">Обязательные файлы cookie</h4>
                <p className="text-xs sm:text-sm text-neutral-400 leading-snug">
                  Необходимы для корректной работы сайта и сохранения ваших настроек конфиденциальности.
                </p>
              </div>
              <div className="pt-1">
                <div
                  className="w-6 h-6 rounded-md bg-white/20 text-white flex items-center justify-center cursor-not-allowed select-none"
                  title="Обязательные cookie всегда включены"
                >
                  <Check className="w-4 h-4 text-white stroke-[3]" />
                </div>
              </div>
            </div>

            {/* Карточка 2: Аналитические */}
            <div
              onClick={() => setLocalPrefs((p) => ({ ...p, analytics: !p.analytics }))}
              className="bg-white/[0.04] hover:bg-white/[0.07] text-[#EDE4EA] rounded-2xl p-4 sm:p-5 flex items-start justify-between gap-4 border border-white/10 hover:border-white/25 shadow-sm cursor-pointer transition-colors"
            >
              <div className="space-y-1">
                <h4 className="font-bold text-base text-white">Аналитические файлы cookie</h4>
                <p className="text-xs sm:text-sm text-neutral-400 leading-snug">
                  Помогают нам оценивать посещаемость сайта и улучшать удобство использования с помощью анонимной статистики Яндекс.Метрики.
                </p>
              </div>
              <div className="pt-1">
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center transition-all ${
                    localPrefs.analytics ? 'bg-white text-black shadow-md' : 'border-2 border-white/40 bg-transparent'
                  }`}
                >
                  {localPrefs.analytics && <Check className="w-4 h-4 text-black stroke-[3]" />}
                </div>
              </div>
            </div>

            {/* Карточка 3: Маркетинговые */}
            <div
              onClick={() => setLocalPrefs((p) => ({ ...p, marketing: !p.marketing }))}
              className="bg-white/[0.04] hover:bg-white/[0.07] text-[#EDE4EA] rounded-2xl p-4 sm:p-5 flex items-start justify-between gap-4 border border-white/10 hover:border-white/25 shadow-sm cursor-pointer transition-colors"
            >
              <div className="space-y-1">
                <h4 className="font-bold text-base text-white">Маркетинговые файлы cookie</h4>
                <p className="text-xs sm:text-sm text-neutral-400 leading-snug">
                  Позволяют отслеживать эффективность рекламы в Яндекс.Директ и настраивать релевантные спецпредложения.
                </p>
              </div>
              <div className="pt-1">
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center transition-all ${
                    localPrefs.marketing ? 'bg-white text-black shadow-md' : 'border-2 border-white/40 bg-transparent'
                  }`}
                >
                  {localPrefs.marketing && <Check className="w-4 h-4 text-black stroke-[3]" />}
                </div>
              </div>
            </div>
          </div>

          {/* Кнопки действий: Фирменный стиль сайта (белая кнопка + стеклянная) */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 mt-6">
            <button
              onClick={handleSave}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-bold uppercase tracking-wider text-xs sm:text-sm transition-colors cursor-pointer active:scale-95"
            >
              Сохранить выбор
            </button>
            <button
              onClick={handleAllowAll}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold uppercase tracking-wider text-xs sm:text-sm shadow-lg transition-all cursor-pointer active:scale-95"
            >
              Разрешить все
            </button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};
