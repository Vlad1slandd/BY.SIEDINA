import React from 'react';

interface LiveProjectButtonProps {
  className?: string;
  onClick?: () => void;
  href?: string;
  label?: string;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  className = '',
  onClick,
  href = '#',
  label = 'Смотреть проект',
}) => {
  return (
    <a
      href={href}
      onClick={onClick}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest transition-all duration-300 hover:bg-[#D7E2EA]/10 hover:scale-105 active:scale-95 px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base ${className}`}
    >
      {label}
    </a>
  );
};
