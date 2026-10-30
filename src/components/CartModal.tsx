import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  Sparkles,
  MessageCircle,
  Send,
  Phone,
  ArrowRight,
  Flower2,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartModal: React.FC = () => {
  const { items, isOpen, closeCart, updateQuantity, removeItem, clearCart, totalPrice, totalCount } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerComment, setCustomerComment] = useState('');
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  // Формирование текста заказа для мессенджеров
  const buildOrderText = () => {
    const lines = [
      '🌸 *НОВЫЙ ЗАКАЗ ИЗ СТУДИИ BY SIEDINA*',
      '----------------------------------------',
    ];

    items.forEach((item, index) => {
      lines.push(`${index + 1}. *${item.title}* x${item.quantity}`);
      if (item.details) {
        lines.push(`   ${item.details}`);
      }
      lines.push(`   Стоимость: ${(item.price * item.quantity).toLocaleString('ru-RU')} ₽`);
      lines.push('');
    });

    lines.push('----------------------------------------');
    lines.push(`💰 *ИТОГО К ОПЛАТЕ: ${totalPrice.toLocaleString('ru-RU')} ₽*`);

    if (customerName.trim() || customerPhone.trim() || customerAddress.trim()) {
      lines.push('');
      lines.push('📋 *Данные получателя / заказчика:*');
      if (customerName.trim()) lines.push(`• Имя: ${customerName.trim()}`);
      if (customerPhone.trim()) lines.push(`• Телефон: ${customerPhone.trim()}`);
      if (customerAddress.trim()) lines.push(`• Адрес доставки: ${customerAddress.trim()}`);
      if (customerComment.trim()) lines.push(`• Комментарий: ${customerComment.trim()}`);
    }

    return lines.join('\n');
  };

  const encodedText = encodeURIComponent(buildOrderText());
  const waLink = `https://wa.me/79675015113?text=${encodedText}`;
  const tgLink = `https://t.me/by_siedina_bot`;

  // Генерация ссылки для прямого оформления в @by_siedina_bot с подтягиванием состава заказа
  const buildBotLink = () => {
    try {
      const orderPayload = {
        items: items.map((item) => ({
          title: item.title,
          quantity: item.quantity,
          price: item.price,
          details: item.details || '',
        })),
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
  };
  const botLink = buildBotLink();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCart}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Сайдбар корзины */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 26, stiffness: 240 }}
          className="relative w-full max-w-xl bg-gradient-to-b from-[#18101E] via-[#150D1A] to-[#100914] text-[#EDE4EA] h-full shadow-2xl flex flex-col border-l border-white/10 z-10"
        >
          {/* Header корзины */}
          <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-black/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/10">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight text-white flex items-center gap-2">
                  Корзина заказа
                  {totalCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-white text-black text-xs font-bold">
                      {totalCount}
                    </span>
                  )}
                </h3>
                <p className="text-xs text-neutral-400 font-light">
                  {totalCount > 0 ? 'Проверьте позиции и подтвердите заказ' : 'Ваша корзина пуста'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  title="Очистить всю корзину"
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-red-400 transition-colors text-xs flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={closeCart}
                className="w-10 h-10 rounded-2xl border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label="Закрыть"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Список товаров */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4 gap-4">
                <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-500">
                  <Flower2 className="w-10 h-10 stroke-[1.2]" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-lg text-white">В корзине пока пусто</h4>
                  <p className="text-xs sm:text-sm text-neutral-400 max-w-xs font-light">
                    Выберите понравившийся готовый букет из каталога или соберите свой в онлайн-калькуляторе
                  </p>
                </div>
                <button
                  onClick={closeCart}
                  className="mt-2 px-6 py-2.5 rounded-xl bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  Перейти к букетам
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/[0.04] hover:bg-white/[0.06] border border-white/10 rounded-2xl p-4 flex gap-4 items-start transition-all"
                >
                  {/* Миниатюра */}
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl shrink-0 border border-white/10 bg-black/40"
                    />
                  ) : (
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl shrink-0 border border-white/10 bg-white/5 flex items-center justify-center text-white/50">
                      <Flower2 className="w-8 h-8" />
                    </div>
                  )}

                  {/* Описание позиции */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-sm sm:text-base text-white truncate leading-snug">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-neutral-500 hover:text-red-400 transition-colors p-1 -mr-1 cursor-pointer"
                          title="Удалить"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {item.subtitle && (
                        <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5 font-light">
                          {item.subtitle}
                        </p>
                      )}

                      {item.details && (
                        <p className="text-[11px] sm:text-xs text-neutral-400 line-clamp-2 mt-1 whitespace-pre-line leading-relaxed">
                          {item.details}
                        </p>
                      )}
                    </div>

                    {/* Цена и количество */}
                    <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-white/5">
                      <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl p-1">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/15 text-white flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/15 text-white flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-base sm:text-lg font-black text-white">
                          {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                        </span>
                        {item.quantity > 1 && (
                          <div className="text-[10px] text-neutral-400">
                            {item.price.toLocaleString('ru-RU')} ₽ / шт
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer корзины с итогом и кнопками */}
          {items.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-white/10 bg-black/40 flex flex-col gap-4">
              {/* Поля контактов при желании */}
              <div>
                <button
                  onClick={() => setShowCheckoutForm(!showCheckoutForm)}
                  className="text-xs text-[#BBCCD7] hover:text-white font-medium flex items-center gap-1.5 transition-colors cursor-pointer mb-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {showCheckoutForm ? 'Скрыть данные получателя' : '+ Указать адрес и данные для доставки'}
                </button>

                {showCheckoutForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2"
                  >
                    <input
                      type="text"
                      placeholder="Ваше имя"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30"
                    />
                    <input
                      type="tel"
                      placeholder="Номер телефона"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30"
                    />
                    <input
                      type="text"
                      placeholder="Адрес доставки в Саратове"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full sm:col-span-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30"
                    />
                    <input
                      type="text"
                      placeholder="Пожелания к заказу / время"
                      value={customerComment}
                      onChange={(e) => setCustomerComment(e.target.value)}
                      className="w-full sm:col-span-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30"
                    />
                  </motion.div>
                )}
              </div>

              {/* Итоговая сумма */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="text-xs uppercase tracking-wider text-neutral-400">
                    Итого к оплате ({totalCount} поз.):
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {totalPrice.toLocaleString('ru-RU')} ₽
                  </div>
                </div>
                <div className="text-right text-[11px] text-neutral-400">
                  Доставка по Саратову <br /> рассчитывается флористом
                </div>
              </div>

              {/* Кнопки мгновенной отправки заказа */}
              <div className="flex flex-col gap-2 pt-1">
                {/* 1. Интерактивный Telegram-бот студии */}
                <a
                  href={botLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#229ED9] to-[#0088cc] hover:from-[#1e8dbf] hover:to-[#0077b5] text-white font-black text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-[0_8px_25px_rgba(34,158,217,0.4)] cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Оформить через Telegram-бота
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>

                {/* 2. Отправка в WhatsApp */}
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-black" />
                  Отправить заказ в WhatsApp
                </a>

                {/* 3. Открыть бота напрямую */}
                <a
                  href={tgLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Написать в Telegram @by_siedina_bot
                </a>

                <a
                  href="tel:+79675015113"
                  className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Позвонить флористу: +7 (967) 501-51-13
                </a>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
