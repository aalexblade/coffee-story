import { forwardRef, useId, useImperativeHandle, useRef } from 'react';
import type { CoffeeVisualHandle } from './coffeeScene.types';
import styles from './CoffeeScene.module.css';

export const CoffeeScene = forwardRef<CoffeeVisualHandle>((_, ref) => {
  const rootRef = useRef<SVGSVGElement>(null);

  // Generate unique IDs for SVG defs
  const rawId = useId();
  const shadowId = `sceneShadow-${rawId}`;
  const espressoClipId = `espressoCupClip-${rawId}`;
  const cortadoClipId = `cortadoClip-${rawId}`;

  // Hero refs
  const heroRef = useRef<SVGGElement>(null);
  const packageRef = useRef<SVGGElement>(null);
  const beansRef = useRef<SVGGElement>(null);

  // Espresso refs
  const espressoRef = useRef<SVGGElement>(null);
  const espressoCupRef = useRef<SVGGElement>(null);
  const espressoLiquidRef = useRef<SVGRectElement>(null);
  const espressoCremaRef = useRef<SVGGElement>(null);
  const espressoStreamRef = useRef<SVGPathElement>(null);

  // Cortado refs
  const cortadoRef = useRef<SVGGElement>(null);
  const cortadoGlassRef = useRef<SVGGElement>(null);
  const cortadoLiquidRef = useRef<SVGRectElement>(null);
  const cortadoMilkRef = useRef<SVGRectElement>(null);
  const cortadoStreamRef = useRef<SVGPathElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      get root() {
        return rootRef.current;
      },
      get hero() {
        return heroRef.current;
      },
      get package() {
        return packageRef.current;
      },
      get beans() {
        return beansRef.current;
      },
      get espresso() {
        return espressoRef.current;
      },
      get espressoCup() {
        return espressoCupRef.current;
      },
      get espressoLiquid() {
        return espressoLiquidRef.current;
      },
      get espressoCrema() {
        return espressoCremaRef.current;
      },
      get espressoStream() {
        return espressoStreamRef.current;
      },
      get cortado() {
        return cortadoRef.current;
      },
      get cortadoGlass() {
        return cortadoGlassRef.current;
      },
      get cortadoLiquid() {
        return cortadoLiquidRef.current;
      },
      get cortadoMilk() {
        return cortadoMilkRef.current;
      },
      get cortadoStream() {
        return cortadoStreamRef.current;
      },
    }),
    [],
  );

  return (
    <svg
      ref={rootRef}
      className={styles.scene}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id={shadowId} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="12"
            stdDeviation="16"
            floodColor="#2C1810"
            floodOpacity="0.12"
          />
        </filter>

        <clipPath id={espressoClipId}>
          <path d="M120 220 H280 C275 320 255 340 200 340 C145 340 125 320 120 220 Z" />
        </clipPath>

        <clipPath id={cortadoClipId}>
          <path d="M125 220 H275 L262 350 Q200 365 138 350 Z" />
        </clipPath>
      </defs>

      {/* HERO SCENE */}
      <g ref={heroRef}>
        <g ref={packageRef} filter={`url(#${shadowId})`}>
          <rect
            x="140"
            y="110"
            width="120"
            height="170"
            rx="16"
            fill="#2C1810"
          />
          <rect x="155" y="130" width="90" height="130" rx="8" fill="#3D2317" />
          <path
            d="M170 170 C170 155 230 155 230 170 C230 200 170 190 170 215 C170 230 230 230 230 215"
            stroke="#D4A373"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        <g ref={beansRef} filter={`url(#${shadowId})`}>
          <ellipse
            cx="110"
            cy="270"
            rx="16"
            ry="11"
            fill="#4A2810"
            transform="rotate(-25 110 270)"
          />
          <ellipse
            cx="285"
            cy="280"
            rx="14"
            ry="10"
            fill="#3D2317"
            transform="rotate(35 285 280)"
          />
          <ellipse
            cx="135"
            cy="305"
            rx="12"
            ry="8"
            fill="#5C3317"
            transform="rotate(15 135 305)"
          />
        </g>
      </g>

      {/* ESPRESSO SCENE */}
      <g ref={espressoRef}>
        <path
          ref={espressoStreamRef}
          d="M200 80 L200 220"
          stroke="#3D2317"
          strokeWidth="6"
          strokeLinecap="round"
        />

        <g ref={espressoCupRef} filter={`url(#${shadowId})`}>
          <path
            d="M120 220 H280 C275 320 255 340 200 340 C145 340 125 320 120 220 Z"
            fill="#F4E8D8"
          />
          <path
            d="M275 235 C305 235 310 285 270 290"
            stroke="#F4E8D8"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
          />
          <g clipPath={`url(#${espressoClipId})`}>
            <rect
              ref={espressoLiquidRef}
              x="110"
              y="360"
              width="180"
              height="130"
              fill="#2C1810"
            />
            <g ref={espressoCremaRef}>
              <ellipse cx="200" cy="225" rx="75" ry="8" fill="#C68B59" />
              <ellipse cx="200" cy="225" rx="65" ry="5" fill="#D4A373" />
            </g>
          </g>
        </g>
      </g>

      {/* CORTADO SCENE */}
      <g ref={cortadoRef}>
        <path
          ref={cortadoStreamRef}
          d="M200 70 L200 225"
          stroke="#F4E8D8"
          strokeWidth="9"
          strokeLinecap="round"
        />

        {/* Liquid layers rendered FIRST behind the glass outlines */}
        <g clipPath={`url(#${cortadoClipId})`}>
          {/* Coffee — bottom 50% */}
          <rect
            ref={cortadoLiquidRef}
            x="127"
            y="285"
            width="146"
            height="85"
            fill="#75442F"
          />

          {/* Milk — top 50% */}
          <rect
            ref={cortadoMilkRef}
            x="127"
            y="220"
            width="146"
            height="65"
            fill="#DCC7AD"
          />
        </g>

        {/* Glass body & stroke rendered SECOND on top of liquids */}
        <g ref={cortadoGlassRef} filter={`url(#${shadowId})`}>
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
      </g>
    </svg>
  );
});

CoffeeScene.displayName = 'CoffeeScene';
