import React, { useId } from 'react';

interface CoffeeCupProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
}

export const CoffeeCup: React.FC<CoffeeCupProps> = ({
  id,
  className,
  children,
}) => {
  const clipId = useId();

  return (
    <g id={id} className={className}>
      <defs>
        {/* Контур внутрішньої частини чашки для кліпування рідини */}
        <clipPath id={clipId}>
          <path d="M 120 220 C 120 340, 150 350, 200 350 C 250 350, 280 340, 280 220 Z" />
        </clipPath>
      </defs>

      {/* Шари рідини, обрізані по контуру чашки */}
      <g clipPath={`url(#${clipId})`}>{children}</g>

      {/* Зовнішній контур / ручка / стінки чашки */}
      <path
        d="M 120 220 C 120 340, 150 350, 200 350 C 250 350, 280 340, 280 220 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
      />
      {/* Ручка чашки */}
      <path
        d="M 280 240 C 310 240, 310 300, 280 300"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
      />
    </g>
  );
};
