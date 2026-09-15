import { useId } from 'react';
import type { ReactNode } from 'react';

interface CoffeeGlassProps {
  className?: string;
  children?: ReactNode;
  variant?: 'short' | 'tall';
}

const GLASS_PATHS = {
  short: 'M125 220 H275 L262 350 Q200 365 138 350 Z',
  tall: 'M140 165 H260 L250 350 Q200 365 150 350 Z',
} as const;

export function CoffeeGlass({
  children,
  className,
  variant = 'short',
}: CoffeeGlassProps) {
  const clipId = `coffee-glass-clip-${useId().replace(/:/g, '')}`;
  const glassPath = GLASS_PATHS[variant];

  return (
    <g className={className}>
      <defs>
        <clipPath id={clipId}>
          <path d={glassPath} />
        </clipPath>
      </defs>

      <g clipPath={`url(#${clipId})`}>{children}</g>

      <path
        d={glassPath}
        fill="#E8E0D7"
        fillOpacity="0.18"
        stroke="#CFC4B8"
        strokeWidth="3"
      />

      <path
        d={variant === 'tall' ? 'M140 165 H260' : 'M125 220 H275'}
        stroke="#BFB2A4"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </g>
  );
}
