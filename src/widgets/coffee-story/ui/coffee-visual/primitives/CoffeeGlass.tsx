import { useId } from 'react';
import type { ReactNode } from 'react';

interface CoffeeGlassProps {
  className?: string;
  children?: ReactNode;
}

const GLASS_PATH = 'M125 220 H275 L262 350 Q200 365 138 350 Z';

export function CoffeeGlass({ children, className }: CoffeeGlassProps) {
  const clipId = `coffee-glass-clip-${useId().replace(/:/g, '')}`;

  return (
    <g className={className}>
      <defs>
        <clipPath id={clipId}>
          <path d={GLASS_PATH} />
        </clipPath>
      </defs>

      <g clipPath={`url(#${clipId})`}>{children}</g>

      <path
        d={GLASS_PATH}
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
