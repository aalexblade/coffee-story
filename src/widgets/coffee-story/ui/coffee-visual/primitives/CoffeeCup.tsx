import { useId } from 'react';
import type { ReactNode } from 'react';

interface CoffeeCupProps {
  id?: string;
  className?: string;
  children?: ReactNode;
  handle?: boolean;
}

const CUP_PATH =
  'M112 215 H288 C284 305 265 345 200 345 C135 345 116 305 112 215 Z';

const HANDLE_PATH = 'M280 230 C310 230 314 275 280 282';

export function CoffeeCup({
  id,
  className,
  children,
  handle = true,
}: CoffeeCupProps) {
  const clipId = `coffee-cup-clip-${useId().replace(/:/g, '')}`;

  return (
    <g id={id} className={className}>
      <defs>
        <clipPath id={clipId}>
          <path d={CUP_PATH} />
        </clipPath>
      </defs>

      <path d={CUP_PATH} fill="#F4E8D8" />

      {handle && (
        <path
          d={HANDLE_PATH}
          stroke="#F4E8D8"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />
      )}

      <g clipPath={`url(#${clipId})`}>{children}</g>
    </g>
  );
}
