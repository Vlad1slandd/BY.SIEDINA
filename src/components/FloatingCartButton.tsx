import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const FloatingCartButton: React.FC = () => {
  const { totalCount, totalPrice, toggleCart, isOpen } = useCart();

  if (isOpen || totalCount === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-fadeIn">
      <button
        onClick={toggleCart}
        className="group relative flex items-center gap-3.5 bg-white text-black pl-4 pr-5 py-3 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20 cursor-pointer"
        aria-label="Открыть корзину"
      >
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-600 text-white text-[11px] font-black flex items-center justify-center shadow-md">
            {totalCount}
          </span>
        </div>

        <div className="flex flex-col text-left">
          <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold leading-tight">
            Корзина
          </span>
          <span className="text-sm font-black text-neutral-900 leading-tight">
            {totalPrice.toLocaleString('ru-RU')} ₽
          </span>
        </div>
      </button>
    </div>
  );
};
