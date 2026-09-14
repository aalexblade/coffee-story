import type { ReactNode } from 'react';

interface CoffeeGlassProps {
  children?: ReactNode;
  className?: string;
}

export function CoffeeGlass({ children, className }: CoffeeGlassProps) {
  return (
    <g className={className}>
      {children}

      <path
        d="M125 220 H275 L262 350 Q200 365 138 350 Z"
        fill="#E8E0D7"
        fillOpacity="0.28"
        stroke="#CFC4B8"
        strokeWidth="3"
      />

      <path
        d="M125 220 H275"
        stroke="#BFB2A4"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </g>
  );
}
