import type { ReactNode } from 'react';

interface CoffeeCupProps {
  children?: ReactNode;
  handle?: boolean;
  className?: string;
}

export function CoffeeCup({
  children,
  handle = true,
  className,
}: CoffeeCupProps) {
  return (
    <g className={className}>
      <path
        d="M112 215 H288 C284 305 265 345 200 345 C135 345 116 305 112 215 Z"
        fill="#F4E8D8"
      />

      {handle && (
        <path
          d="M280 230 C310 230 314 275 280 282"
          stroke="#F4E8D8"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />
      )}

      {children}
    </g>
  );
}
