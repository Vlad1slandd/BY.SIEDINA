import React from 'react';
import { FadeIn } from './FadeIn';

interface ServiceItem {
  number: string;
  name: string;
  description: string;
}

const services: ServiceItem[] = [
  {
    number: '01',
    name: 'Авторские букеты',
    description: 'Создание уникальных сборных и монобукетов из свежих премиальных цветов с учетом повода, характера получателя и ваших пожеланий.',
  },
  {
    number: '02',
    name: 'Свадебная флористика',
    description: 'Комплексное цветочное оформление свадеб: букет невесты, бутоньерки, выездные церемонии, президиум, столы гостей и фотозоны.',
  },
  {
    number: '03',
    name: 'Оформление событий',
    description: 'Цветочный декор презентаций, корпоративных вечеров, ресторанов и витрин, подчеркивающий статус и атмосферу мероприятия.',
  },
  {
    number: '04',
    name: 'Цветочная подписка',
    description: 'Регулярная доставка свежих авторских композиций для дома или офиса по удобному графику для поддержания постоянной красоты и уюта.',
  },
  {
    number: '05',
    name: 'Доставка и сервис',
    description: 'Бережная доставка точно ко времени, фирменная открытка с вашими пожеланиями, транспортировочный аквапак и средство для стойкости цветов в подарок.',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="relative w-full text-[#1E1424] px-4 sm:px-8 md:px-10 py-24 sm:py-32 md:py-40 -mt-[2px]"
      style={{
        background: 'linear-gradient(180deg, #22162B 0%, rgba(34, 22, 43, 0.98) 30px, #FAF4F6 220px, #FAF4F6 calc(100% - 220px), rgba(28, 19, 36, 0.98) calc(100% - 30px), #1C1324 100%)',
      }}
    >
      {/* Контент секции */}
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Heading */}
        <FadeIn delay={0} y={30} className="text-center mb-10 sm:mb-14 md:mb-20">
          <h2
            className="text-[#1E1424] font-black uppercase tracking-tight leading-none"
            style={{ fontSize: 'clamp(2.5rem, 11vw, 160px)' }}
          >
            Услуги
          </h2>
        </FadeIn>

        {/* 5 Service items in vertical list */}
        <div className="flex flex-col">
          {services.map((service, index) => (
            <FadeIn
              key={service.number}
              delay={index * 0.1}
              y={30}
              className={`flex flex-col sm:flex-row sm:items-start md:items-center justify-between gap-3 sm:gap-6 md:gap-12 py-5 sm:py-7 md:py-9 ${
                index !== 0 ? 'border-t border-[#1E1424]/15' : ''
              }`}
            >
              {/* Number on left */}
              <div
                className="font-black text-[#1E1424] leading-none select-none min-w-[70px] sm:min-w-[130px] md:min-w-[180px] text-4xl sm:text-6xl md:text-[clamp(3.5rem,8vw,120px)]"
              >
                {service.number}
              </div>

              {/* Name + description stacked vertically on right */}
              <div className="flex-1 flex flex-col justify-center gap-1.5 sm:gap-2.5">
                <h3
                  className="font-medium uppercase text-[#1E1424] tracking-tight leading-tight text-lg sm:text-xl md:text-2xl lg:text-3xl"
                >
                  {service.name}
                </h3>
                <p
                  className="font-light leading-relaxed text-[#1E1424] opacity-75 max-w-2xl text-sm sm:text-base md:text-lg"
                >
                  {service.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
