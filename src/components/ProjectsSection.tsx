import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { useCart } from '../context/CartContext';
import { 
  Sparkles, 
  Plus, 
  Minus, 
  Check, 
  ShoppingBag, 
  RotateCcw, 
  Heart, 
  MessageCircle, 
  Phone, 
  Send, 
  X, 
  ArrowRight,
  Sliders,
  Flower2
} from 'lucide-react';

// --- ДАННЫЕ ГОТОВЫХ БУКЕТОВ ---
interface ReadyBouquet {
  id: string;
  name: string;
  price: number;
  category: 'all' | 'authors' | 'hits' | 'boxes';
  tag: string;
  image: string;
  composition: string[];
  description: string;
  calcPreset: {
    roses?: number;
    sprayRoses?: number;
    hydrangeas?: number;
    peonies?: number;
    eustoma?: number;
    dianthus?: number;
    gypsophila?: number;
    eucalyptus?: boolean;
    pistachio?: boolean;
    cotton?: boolean;
    packaging: 'paper' | 'film' | 'box' | 'basket';
  };
}

const BASE = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;

const readyBouquets: ReadyBouquet[] = [
  {
    id: 'b1',
    name: 'Прованс Роял',
    price: 4900,
    category: 'hits',
    tag: 'Хит сезона',
    image: `${BASE}gallery/photo-1.jpg`,
    composition: ['Гортензия шаровидная', 'Пионовидные розы', 'Эвкалипт цинерея'],
    description: 'Воздушный и нежный авторский букет в пастельных тонах с акцентной небесной гортензией.',
    calcPreset: {
      roses: 5,
      hydrangeas: 1,
      eustoma: 3,
      eucalyptus: true,
      packaging: 'paper',
    },
  },
  {
    id: 'b2',
    name: 'Пудровый рассвет',
    price: 4400,
    category: 'authors',
    tag: 'Авторский',
    image: `${BASE}gallery/photo-4.jpg`,
    composition: ['Французские розы', 'Сортовой диантус', 'Свежая фисташка'],
    description: 'Стильная композиция в пудровой гамме, передающая искреннее тепло и внимание к деталям.',
    calcPreset: {
      roses: 7,
      dianthus: 5,
      pistachio: true,
      packaging: 'film',
    },
  },
  {
    id: 'b3',
    name: 'Облако нежности',
    price: 6200,
    category: 'boxes',
    tag: 'В шляпной коробке',
    image: `${BASE}gallery/photo-6.jpg`,
    composition: ['Сортовые пионы', 'Белая гортензия', 'Эвкалипт', 'Шляпная коробка'],
    description: 'Роскошная композиция в шляпной коробке Deluxe. Не требует вазы — внутри специальный оазис.',
    calcPreset: {
      peonies: 5,
      hydrangeas: 2,
      eucalyptus: true,
      packaging: 'box',
    },
  },
  {
    id: 'b4',
    name: 'Монреаль Делюкс',
    price: 5700,
    category: 'hits',
    tag: 'Популярно',
    image: `${BASE}gallery/photo-8.jpg`,
    composition: ['Пионовидные кустовые розы', 'Эустома', 'Натуральный хлопок'],
    description: 'Пышный букет с богатой текстурой и тонким цветочным ароматом для особого повода.',
    calcPreset: {
      sprayRoses: 7,
      eustoma: 5,
      cotton: true,
      packaging: 'paper',
    },
  },
  {
    id: 'b5',
    name: 'Коралловый закат',
    price: 4200,
    category: 'authors',
    tag: 'Новинка',
    image: `${BASE}gallery/photo-11.jpg`,
    composition: ['Коралловые розы', 'Белая гипсофила', 'Атласная лента'],
    description: 'Яркий и жизнерадостный букет, который гарантированно вызовет улыбку и восторг.',
    calcPreset: {
      roses: 7,
      gypsophila: 3,
      packaging: 'film',
    },
  },
  {
    id: 'b6',
    name: 'Элегия любви',
    price: 7800,
    category: 'boxes',
    tag: 'Премиум',
    image: `${BASE}gallery/photo-12.jpg`,
    composition: ['Премиальные пионы', 'Гортензии', 'Эвкалипт', 'Шляпная коробка'],
    description: 'Грандиозный подарок для признания в чувствах или юбилея. Максимальная пышность и стойкость.',
    calcPreset: {
      peonies: 7,
      hydrangeas: 2,
      eucalyptus: true,
      packaging: 'box',
    },
  },
];

// --- ЦВЕТЫ ДЛЯ КАЛЬКУЛЯТОРА ---
interface FlowerOption {
  key: keyof CalculatorFlowers;
  name: string;
  pricePerUnit: number;
  unit: string;
}

interface CalculatorFlowers {
  roses: number;
  sprayRoses: number;
  hydrangeas: number;
  peonies: number;
  eustoma: number;
  dianthus: number;
  gypsophila: number;
}

const flowerCatalog: FlowerOption[] = [
  { key: 'roses', name: 'Пионовидная роза', pricePerUnit: 350, unit: 'шт' },
  { key: 'sprayRoses', name: 'Кустовая пионовидная роза', pricePerUnit: 290, unit: 'ветка' },
  { key: 'hydrangeas', name: 'Гортензия шаровидная', pricePerUnit: 950, unit: 'шт' },
  { key: 'peonies', name: 'Сортовой пион', pricePerUnit: 480, unit: 'шт' },
  { key: 'eustoma', name: 'Французская эустома', pricePerUnit: 260, unit: 'ветка' },
  { key: 'dianthus', name: 'Сортовой диантус', pricePerUnit: 190, unit: 'шт' },
  { key: 'gypsophila', name: 'Воздушная гипсофила', pricePerUnit: 230, unit: 'ветка' },
];

const PACKAGING_OPTIONS = [
  { id: 'paper', name: 'Дизайнерская бумага', price: 0 },
  { id: 'film', name: 'Матовая корейская пленка', price: 250 },
  { id: 'box', name: 'Шляпная коробка Deluxe', price: 850 },
  { id: 'basket', name: 'Плетеная корзина с оазисом', price: 1200 },
] as const;

export const ProjectsSection: React.FC = () => {
  const { items, addItem, updateQuantity } = useCart();
  // Фильтр для готовых букетов
  const [activeTab, setActiveTab] = useState<'all' | 'authors' | 'hits' | 'boxes'>('all');
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  // Состояние калькулятора
  const [flowers, setFlowers] = useState<CalculatorFlowers>({
    roses: 5,
    sprayRoses: 0,
    hydrangeas: 1,
    peonies: 0,
    eustoma: 3,
    dianthus: 0,
    gypsophila: 0,
  });

  const [greens, setGreens] = useState({
    eucalyptus: true,
    pistachio: false,
    cotton: false,
  });

  const [packaging, setPackaging] = useState<'paper' | 'film' | 'box' | 'basket'>('paper');
  const [aquabox, setAquabox] = useState(false);
  const [postcardText, setPostcardText] = useState('');

  // Модальное окно оформления
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderSummary, setOrderSummary] = useState<{
    title: string;
    details: string;
    totalPrice: number;
  } | null>(null);

  // Переключение лайков
  const toggleFavorite = (id: string) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Изменение количества цветов
  const updateFlowerCount = (key: keyof CalculatorFlowers, delta: number) => {
    setFlowers((prev) => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta),
    }));
  };

  // Сброс калькулятора
  const resetCalculator = () => {
    setFlowers({
      roses: 0,
      sprayRoses: 0,
      hydrangeas: 0,
      peonies: 0,
      eustoma: 0,
      dianthus: 0,
      gypsophila: 0,
    });
    setGreens({ eucalyptus: false, pistachio: false, cotton: false });
    setPackaging('paper');
    setAquabox(false);
    setPostcardText('');
  };

  // Загрузить пресет из готового букета в калькулятор
  const loadPresetIntoCalculator = (preset: ReadyBouquet['calcPreset']) => {
    setFlowers({
      roses: preset.roses || 0,
      sprayRoses: preset.sprayRoses || 0,
      hydrangeas: preset.hydrangeas || 0,
      peonies: preset.peonies || 0,
      eustoma: preset.eustoma || 0,
      dianthus: preset.dianthus || 0,
      gypsophila: preset.gypsophila || 0,
    });
    setGreens({
      eucalyptus: !!preset.eucalyptus,
      pistachio: !!preset.pistachio,
      cotton: !!preset.cotton,
    });
    setPackaging(preset.packaging);

    // Скролл к калькулятору на мобильных
    const calcEl = document.getElementById('bouquet-calculator');
    if (calcEl && window.innerWidth < 1024) {
      calcEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Фильтрация готовых букетов
  const filteredBouquets = useMemo(() => {
    if (activeTab === 'all') return readyBouquets;
    return readyBouquets.filter((b) => b.category === activeTab);
  }, [activeTab]);

  // Подсчет количества цветов
  const totalFlowerCount = useMemo(() => {
    return Object.values(flowers).reduce((acc, curr) => acc + curr, 0);
  }, [flowers]);

  // Подсчет цены в калькуляторе
  const totalPrice = useMemo(() => {
    let sum = 0;
    flowerCatalog.forEach((f) => {
      sum += flowers[f.key] * f.pricePerUnit;
    });

    if (greens.eucalyptus) sum += 350;
    if (greens.pistachio) sum += 250;
    if (greens.cotton) sum += 300;

    const packPrice = PACKAGING_OPTIONS.find((p) => p.id === packaging)?.price || 0;
    sum += packPrice;

    if (aquabox) sum += 200;

    return sum;
  }, [flowers, greens, packaging, aquabox]);

  // Добавить готовый букет в корзину
  const handleAddToCart = (b: ReadyBouquet) => {
    addItem({
      type: 'ready',
      title: `Букет «${b.name}»`,
      subtitle: b.tag,
      image: b.image,
      price: b.price,
      details: `Состав: ${b.composition.join(', ')}`,
    });
  };

  // Добавить собранный букет в корзину
  const handleAddCustomToCart = () => {
    const selectedFlowersList = flowerCatalog
      .filter((f) => flowers[f.key] > 0)
      .map((f) => `${f.name} — ${flowers[f.key]} ${f.unit}`)
      .join(', ');

    const selectedGreensList = [];
    if (greens.eucalyptus) selectedGreensList.push('Эвкалипт');
    if (greens.pistachio) selectedGreensList.push('Фисташка');
    if (greens.cotton) selectedGreensList.push('Хлопок');

    const packName = PACKAGING_OPTIONS.find((p) => p.id === packaging)?.name || 'Упаковка';

    const details = [
      selectedFlowersList ? `Цветы: ${selectedFlowersList}` : 'Цветы не выбраны',
      selectedGreensList.length ? `Зелень: ${selectedGreensList.join(', ')}` : null,
      `Упаковка: ${packName}`,
      aquabox ? 'Аквабокс: Да' : null,
      postcardText ? `Открытка: "${postcardText}"` : null,
    ]
      .filter(Boolean)
      .join('\n');

    addItem({
      type: 'custom',
      title: 'Индивидуальный букет из Конструктора',
      subtitle: `${totalFlowerCount} цветов • ${packName}`,
      price: totalPrice,
      details,
    });
  };

  // Генерация ссылок WhatsApp / Telegram
  const waLink = useMemo(() => {
    if (!orderSummary) return '';
    const text = encodeURIComponent(
      `Здравствуйте! Хочу заказать букет в студии By Siedina:\n\n*${orderSummary.title}*\n${orderSummary.details}\n\n*Итого: ${orderSummary.totalPrice.toLocaleString('ru-RU')} ₽*`
    );
    return `https://wa.me/79675015113?text=${text}`;
  }, [orderSummary]);

  const tgLink = useMemo(() => {
    if (!orderSummary) return 'https://t.me/by_siedina_bot';
    try {
      const orderPayload = {
        items: [
          {
            title: orderSummary.title,
            quantity: 1,
            price: orderSummary.totalPrice,
            details: orderSummary.details || '',
          },
        ],
      };
      const jsonString = JSON.stringify(orderPayload);
      const base64Data = btoa(
        encodeURIComponent(jsonString).replace(/%([0-9A-F]{2})/g, (_, p1) =>
          String.fromCharCode(parseInt(p1, 16))
        )
      );
      const urlSafe = base64Data.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      return `https://t.me/by_siedina_bot?start=order_${urlSafe}`;
    } catch {
      return `https://t.me/by_siedina_bot`;
    }
  }, [orderSummary]);

  return (
    <section id="projects" className="bg-gradient-to-b from-[#1C1324] via-[#191120] to-[#16101D] py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10 relative -mt-[2px]">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок секции */}
        <FadeIn delay={0} y={30} className="text-center mb-8 sm:mb-12">
          <h2
            className="hero-heading font-black uppercase tracking-tight leading-none"
            style={{ fontSize: 'clamp(2.5rem, 9vw, 120px)' }}
          >
            Букеты & Конструктор
          </h2>
          <p className="mt-4 text-[#D7E2EA]/70 font-light max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Выберите готовый авторский шедевр или соберите уникальный букет под свой вкус и бюджет с моментальным расчетом стоимости.
          </p>
        </FadeIn>

        {/* ОСНОВНОЙ SPLIT-ЭКРАН: 2 КОЛОНКИ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* --- ЛЕВАЯ ПОЛОВИНА: ГОТОВЫЕ БУКЕТЫ (7 КОЛОНОК) --- */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Панель фильтров и вкладок */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-white/10">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar">
                {[
                  { key: 'all', label: 'Все букеты' },
                  { key: 'hits', label: 'Хиты' },
                  { key: 'authors', label: 'Авторские' },
                  { key: 'boxes', label: 'В коробках' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                      activeTab === tab.key
                        ? 'bg-white text-black shadow-lg font-semibold'
                        : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <span className="text-xs text-neutral-400 font-medium">
                {filteredBouquets.length} позиций
              </span>
            </div>

            {/* Сетка готовых букетов */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {filteredBouquets.map((b, idx) => {
                const isLiked = favoriteIds.includes(b.id);
                const cartItem = items.find((i) => i.type === 'ready' && i.title === `Букет «${b.name}»`);
                const qtyInCart = cartItem ? cartItem.quantity : 0;
                return (
                  <FadeIn key={b.id} delay={idx * 0.08} y={20}>
                    <div className="group relative bg-[#131416] border border-white/10 rounded-2xl overflow-hidden hover:border-white/25 transition-all duration-300 flex flex-col h-full shadow-lg">
                      {/* Картинка букета */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
                        <img
                          src={b.image}
                          alt={b.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Бейдж статуса */}
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 sm:bg-black/60 sm:backdrop-blur-md border border-white/10 text-[11px] font-medium text-white uppercase tracking-wider">
                          {b.tag}
                        </div>
                        {/* Лайк кнопка */}
                        <button
                          onClick={() => toggleFavorite(b.id)}
                          aria-label="В избранное"
                          className="absolute top-3 right-3 p-2 rounded-full bg-black/75 sm:bg-black/50 sm:backdrop-blur-md border border-white/10 text-white/80 hover:text-rose-400 transition-colors"
                        >
                          <Heart
                            className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`}
                          />
                        </button>
                      </div>

                      {/* Текстовая информация */}
                      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-semibold text-lg sm:text-xl text-white group-hover:text-[#BBCCD7] transition-colors">
                              {b.name}
                            </h3>
                            <div className="text-lg font-bold text-white whitespace-nowrap">
                              {b.price.toLocaleString('ru-RU')} ₽
                            </div>
                          </div>
                          <p className="mt-1 text-xs sm:text-sm text-neutral-400 font-light line-clamp-2">
                            {b.description}
                          </p>

                          {/* Состав цветков мини-чипсы */}
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {b.composition.map((c, i) => (
                              <span
                                key={i}
                                className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-md bg-white/5 text-neutral-300 border border-white/5"
                              >
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Кнопки действий */}
                        <div className="pt-3 border-t border-white/5 flex items-center gap-2">
                          {qtyInCart > 0 ? (
                            /* Селектор количества прямо на карточке товара */
                            <div className="flex-1 flex items-center justify-between bg-white text-black rounded-xl p-1 shadow-md">
                              <button
                                onClick={() => updateQuantity(cartItem!.id, -1)}
                                className="w-8 h-8 rounded-lg bg-black/5 hover:bg-black/10 active:scale-95 text-black flex items-center justify-center transition-all cursor-pointer font-bold"
                                title="Уменьшить"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <div className="flex items-center gap-1.5 px-1 select-none">
                                <span className="text-xs text-neutral-600 font-medium hidden xs:inline">В корзине:</span>
                                <span className="text-sm font-black text-black">
                                  {qtyInCart} шт
                                </span>
                              </div>
                              <button
                                onClick={() => updateQuantity(cartItem!.id, 1)}
                                className="w-8 h-8 rounded-lg bg-black text-white hover:bg-neutral-800 active:scale-95 flex items-center justify-center transition-all cursor-pointer font-bold shadow-sm"
                                title="Добавить еще"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleAddToCart(b)}
                              className="flex-1 py-2 px-3 rounded-xl bg-white text-black text-xs sm:text-sm font-semibold hover:bg-neutral-200 transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                              В корзину
                            </button>
                          )}
                          <button
                            onClick={() => loadPresetIntoCalculator(b.calcPreset)}
                            title="Перенести состав в конструктор"
                            className="py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm text-neutral-300 hover:text-white transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer shrink-0"
                          >
                            <Sliders className="w-3.5 h-3.5 text-[#BBCCD7]" />
                            <span className="hidden sm:inline">В конструктор</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>

          {/* --- ПРАВАЯ ПОЛОВИНА: КАЛЬКУЛЯТОР БУКЕТА (5 КОЛОНОК, STICKY) --- */}
          <div className="lg:col-span-5" id="bouquet-calculator">
            <div className="static lg:sticky lg:top-24 bg-[#141518] sm:bg-[#141518]/95 sm:backdrop-blur-xl border border-white/10 rounded-3xl p-5 sm:p-7 shadow-2xl flex flex-col gap-6">
              
              {/* Заголовок калькулятора */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white">
                    <Flower2 className="w-5 h-5 text-[#BBCCD7]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg sm:text-xl text-white uppercase tracking-tight">
                      Собери свой букет
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Индивидуальный расчет стоимости
                    </p>
                  </div>
                </div>
                <button
                  onClick={resetCalculator}
                  title="Сбросить все"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors text-xs flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Сбросить</span>
                </button>
              </div>

              {/* ШАГ 1: Выбор цветов */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    1. Выберите цветы и количество
                  </span>
                  <span className="text-xs text-[#BBCCD7] font-medium">
                    Всего: {totalFlowerCount} шт.
                  </span>
                </div>

                <div className="flex flex-col gap-2 max-h-[260px] overflow-y-auto pr-1">
                  {flowerCatalog.map((flower) => {
                    const count = flowers[flower.key];
                    return (
                      <div
                        key={flower.key}
                        className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                          count > 0
                            ? 'bg-white/10 border-white/20 text-white'
                            : 'bg-white/5 border-white/5 text-neutral-300'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="text-xs sm:text-sm font-medium leading-tight">
                            {flower.name}
                          </span>
                          <span className="text-[11px] text-neutral-400">
                            {flower.pricePerUnit} ₽ / {flower.unit}
                          </span>
                        </div>

                        {/* Счетчик +/- */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateFlowerCount(flower.key, -1)}
                            disabled={count <= 0}
                            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                              count > 0
                                ? 'bg-white/10 hover:bg-white/20 text-white active:scale-95'
                                : 'bg-transparent text-neutral-600 cursor-not-allowed'
                            }`}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-bold">
                            {count}
                          </span>
                          <button
                            onClick={() => updateFlowerCount(flower.key, 1)}
                            className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center active:scale-95 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ШАГ 2: Зелень и фактура */}
              <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  2. Зелень и декор
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'eucalyptus', label: 'Эвкалипт', price: '+350 ₽' },
                    { key: 'pistachio', label: 'Фисташка', price: '+250 ₽' },
                    { key: 'cotton', label: 'Хлопок', price: '+300 ₽' },
                  ].map((item) => {
                    const isSelected = greens[item.key as keyof typeof greens];
                    return (
                      <button
                        key={item.key}
                        onClick={() =>
                          setGreens((prev) => ({
                            ...prev,
                            [item.key]: !prev[item.key as keyof typeof greens],
                          }))
                        }
                        className={`p-2 rounded-xl text-center border transition-all flex flex-col items-center gap-0.5 ${
                          isSelected
                            ? 'bg-white/15 border-white/30 text-white shadow-sm'
                            : 'bg-white/5 border-white/5 text-neutral-400 hover:bg-white/10'
                        }`}
                      >
                        <span className="text-[11px] font-medium leading-tight">
                          {item.label}
                        </span>
                        <span className="text-[10px] text-[#BBCCD7]">
                          {item.price}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ШАГ 3: Упаковка */}
              <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  3. Формат и упаковка
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {PACKAGING_OPTIONS.map((pack) => {
                    const isSelected = packaging === pack.id;
                    return (
                      <button
                        key={pack.id}
                        onClick={() => setPackaging(pack.id as any)}
                        className={`p-2.5 rounded-xl text-left border transition-all flex items-start justify-between ${
                          isSelected
                            ? 'bg-white/15 border-white/30 text-white'
                            : 'bg-white/5 border-white/5 text-neutral-400 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="text-xs font-medium leading-tight">
                            {pack.name}
                          </span>
                          <span className="text-[11px] text-[#BBCCD7] mt-0.5">
                            {pack.price === 0 ? 'Бесплатно' : `+${pack.price} ₽`}
                          </span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-white flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ШАГ 4: Дополнения и открытка */}
              <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  4. Открытка & Доставка
                </span>
                <input
                  type="text"
                  value={postcardText}
                  onChange={(e) => setPostcardText(e.target.value)}
                  placeholder="Текст для бесплатной фирменной открытки..."
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-white/30"
                />

                <label className="flex items-center gap-2 cursor-pointer pt-1 text-xs text-neutral-300">
                  <input
                    type="checkbox"
                    checked={aquabox}
                    onChange={(e) => setAquabox(e.target.checked)}
                    className="rounded bg-white/10 border-white/20 text-white focus:ring-0"
                  />
                  <span>Аквабокс для перевозки свежих цветов (+200 ₽)</span>
                </label>
              </div>

              {/* ИТОГОВАЯ ПАНЕЛЬ И КНОПКА ЗАКАЗА */}
              <div className="pt-4 border-t border-white/15 flex flex-col gap-3">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-xs text-neutral-400 uppercase tracking-wider block">
                      Предварительный итог:
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {totalPrice.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                  {totalFlowerCount === 0 && (
                    <span className="text-[11px] text-amber-400/80">
                      Добавьте цветы
                    </span>
                  )}
                </div>

                <button
                  onClick={handleAddCustomToCart}
                  disabled={totalPrice <= 0}
                  className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    totalPrice > 0
                      ? 'bg-white text-black hover:bg-neutral-200 active:scale-[0.99] shadow-xl cursor-pointer'
                      : 'bg-white/10 text-neutral-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  {items.some((i) => i.type === 'custom') ? (
                    <span>Добавить еще букет в корзину ({items.filter((i) => i.type === 'custom').length} в корзине)</span>
                  ) : (
                    <span>Добавить букет в корзину</span>
                  )}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* --- МОДАЛЬНОЕ ОКНО ОФОРМЛЕНИЯ ЗАКАЗА --- */}
      <AnimatePresence>
        {isModalOpen && orderSummary && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#141518] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white shadow-2xl relative"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#BBCCD7] mb-2 font-semibold">
                <Sparkles className="w-4 h-4" /> Быстрое оформление
              </div>

              <h3 className="text-xl sm:text-2xl font-bold mb-3">
                {orderSummary.title}
              </h3>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-xs sm:text-sm text-neutral-300 whitespace-pre-line leading-relaxed mb-6 font-normal">
                {orderSummary.details}
              </div>

              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <span className="text-neutral-400 text-sm">Итого к оплате:</span>
                <span className="text-2xl font-black text-white">
                  {orderSummary.totalPrice.toLocaleString('ru-RU')} ₽
                </span>
              </div>

              {/* Способы подтверждения заказа */}
              <div className="flex flex-col gap-2.5">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366] text-black font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#20ba5a] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-black" />
                  Отправить заказ в WhatsApp
                </a>

                <a
                  href={tgLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#229ED9] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#1e8dbf] transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Оформить в Telegram-боте
                </a>

                <a
                  href="tel:+79675015113"
                  className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-neutral-200 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors border border-white/10"
                >
                  <Phone className="w-4 h-4" />
                  Позвонить флористу: +7 (967) 501-51-13
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
