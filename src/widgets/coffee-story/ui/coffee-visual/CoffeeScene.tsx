'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import styles from './CoffeeScene.module.css';
import type { CoffeeVisualHandle } from './coffeeScene.types';
import { CoffeeCup } from './primitives/CoffeeCup';
import { CoffeeGlass } from './primitives/CoffeeGlass';

export const CoffeeScene = forwardRef<CoffeeVisualHandle>((_, ref) => {
  const rootRef = useRef<SVGSVGElement>(null);

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

  // Flat White refs
  const flatWhiteRef = useRef<SVGGElement>(null);
  const flatWhiteCupRef = useRef<SVGGElement>(null);
  const flatWhiteLiquidRef = useRef<SVGRectElement>(null);
  const flatWhiteMilkRef = useRef<SVGRectElement>(null);
  const flatWhiteCremaRef = useRef<SVGGElement>(null);
  const flatWhiteStreamRef = useRef<SVGPathElement>(null);

  // Cappuccino refs
  const cappuccinoRef = useRef<SVGGElement>(null);
  const cappuccinoCupRef = useRef<SVGGElement>(null);
  const cappuccinoCoffeeRef = useRef<SVGRectElement>(null);
  const cappuccinoMilkRef = useRef<SVGRectElement>(null);
  const cappuccinoFoamRef = useRef<SVGGElement>(null);
  const cappuccinoStreamRef = useRef<SVGPathElement>(null);

  // Latte refs
  const latteRef = useRef<SVGGElement>(null);
  const latteGlassRef = useRef<SVGGElement>(null);
  const latteCoffeeRef = useRef<SVGRectElement>(null);
  const latteMilkRef = useRef<SVGRectElement>(null);
  const latteFoamRef = useRef<SVGGElement>(null);
  const latteStreamRef = useRef<SVGPathElement>(null);
  const latteArtRef = useRef<SVGGElement>(null);

  useImperativeHandle(ref, () => ({
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
    get flatWhite() {
      return flatWhiteRef.current;
    },
    get flatWhiteCup() {
      return flatWhiteCupRef.current;
    },
    get flatWhiteLiquid() {
      return flatWhiteLiquidRef.current;
    },
    get flatWhiteMilk() {
      return flatWhiteMilkRef.current;
    },
    get flatWhiteCrema() {
      return flatWhiteCremaRef.current;
    },
    get flatWhiteStream() {
      return flatWhiteStreamRef.current;
    },
    get cappuccino() {
      return cappuccinoRef.current;
    },
    get cappuccinoCup() {
      return cappuccinoCupRef.current;
    },
    get cappuccinoCoffee() {
      return cappuccinoCoffeeRef.current;
    },
    get cappuccinoMilk() {
      return cappuccinoMilkRef.current;
    },
    get cappuccinoFoam() {
      return cappuccinoFoamRef.current;
    },
    get cappuccinoStream() {
      return cappuccinoStreamRef.current;
    },
    get latte() {
      return latteRef.current;
    },
    get latteGlass() {
      return latteGlassRef.current;
    },
    get latteCoffee() {
      return latteCoffeeRef.current;
    },
    get latteMilk() {
      return latteMilkRef.current;
    },
    get latteFoam() {
      return latteFoamRef.current;
    },
    get latteStream() {
      return latteStreamRef.current;
    },
    get latteArt() {
      return latteArtRef.current;
    },
  }));

  return (
    <svg
      ref={rootRef}
      viewBox="0 0 400 400"
      className={styles.svg}
      aria-hidden="true"
    >
      {/* Background Glow */}
      <circle cx="200" cy="200" r="140" fill="#F4E8D8" fillOpacity="0.25" />

      {/* Hero Scene */}
      <g ref={heroRef}>
        <g ref={packageRef}>
          <rect
            x="140"
            y="120"
            width="120"
            height="170"
            rx="16"
            fill="#3C2A21"
          />
          <rect x="155" y="145" width="90" height="120" rx="8" fill="#D5CEA3" />
          <circle cx="200" cy="185" r="18" fill="#1A120B" />
        </g>
        <g ref={beansRef}>
          <ellipse cx="140" cy="310" rx="14" ry="9" fill="#1A120B" />
          <ellipse cx="260" cy="315" rx="13" ry="8" fill="#1A120B" />
        </g>
      </g>

      {/* Espresso Scene */}
      <g ref={espressoRef}>
        <path
          ref={espressoStreamRef}
          d="M200 70 L200 240"
          stroke="#3C2A21"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <g ref={espressoCupRef}>
          <CoffeeCup handle={true}>
            <rect
              ref={espressoLiquidRef}
              x="120"
              y="255"
              width="160"
              height="80"
              fill="#3C2A21"
            />
            <g ref={espressoCremaRef}>
              <ellipse cx="200" cy="255" rx="76" ry="12" fill="#C68B59" />
            </g>
          </CoffeeCup>
        </g>
      </g>

      {/* Cortado Scene */}
      <g ref={cortadoRef}>
        <path
          ref={cortadoStreamRef}
          d="M200 60 L200 220"
          stroke="#E8E0D7"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <g ref={cortadoGlassRef}>
          <CoffeeGlass>
            <rect
              ref={cortadoLiquidRef}
              x="130"
              y="285"
              width="140"
              height="60"
              fill="#3C2A21"
            />
            <rect
              ref={cortadoMilkRef}
              x="130"
              y="225"
              width="140"
              height="60"
              fill="#E8E0D7"
            />
          </CoffeeGlass>
        </g>
      </g>

      {/* Flat White Scene */}
      <g ref={flatWhiteRef}>
        <path
          ref={flatWhiteStreamRef}
          d="M200 60 L200 220"
          stroke="#F4E8D8"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <g ref={flatWhiteCupRef}>
          <CoffeeCup handle={true}>
            <rect
              ref={flatWhiteLiquidRef}
              x="115"
              y="270"
              width="170"
              height="70"
              fill="#3C2A21"
            />
            <rect
              ref={flatWhiteMilkRef}
              x="115"
              y="220"
              width="170"
              height="50"
              fill="#E8E0D7"
            />
            <g ref={flatWhiteCremaRef}>
              <ellipse cx="200" cy="220" rx="84" ry="12" fill="#D5CEA3" />
            </g>
          </CoffeeCup>
        </g>
      </g>

      {/* Cappuccino Scene */}
      <g ref={cappuccinoRef}>
        <path
          ref={cappuccinoStreamRef}
          d="M200 55 L200 215"
          stroke="#F4E8D8"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <g ref={cappuccinoCupRef}>
          <CoffeeCup handle={true}>
            <rect
              ref={cappuccinoCoffeeRef}
              x="115"
              y="280"
              width="170"
              height="60"
              fill="#3C2A21"
            />
            <rect
              ref={cappuccinoMilkRef}
              x="115"
              y="220"
              width="170"
              height="60"
              fill="#E8E0D7"
            />
            <g ref={cappuccinoFoamRef}>
              <path
                d="M112 215 C130 195 170 190 200 195 C230 190 270 195 288 215 Z"
                fill="#FFF8F0"
              />
            </g>
          </CoffeeCup>
        </g>
      </g>
      {/* Latte Scene */}
      <g ref={latteRef}>
        <path
          ref={latteStreamRef}
          d="M200 55 L200 170"
          stroke="#DCC7AD"
          strokeWidth="9"
          strokeLinecap="round"
        />

        <g ref={latteGlassRef}>
          <CoffeeGlass variant="tall">
            <rect
              ref={latteCoffeeRef}
              x="140"
              y="300"
              width="120"
              height="50"
              fill="#5A3425"
            />
            <rect
              ref={latteMilkRef}
              x="140"
              y="175"
              width="120"
              height="125"
              fill="#DCC7AD"
            />
            <g ref={latteFoamRef}>
              <ellipse cx="200" cy="164" rx="56" ry="8" fill="#F4E8D8" />
            </g>
            <g ref={latteArtRef}>
              <path
                d="M200 160 C184 150 175 158 182 166 C188 173 200 180 200 180 C200 180 212 173 218 166 C225 158 216 150 200 160 Z"
                fill="#C68B59"
              />
              <path
                d="M200 180 C200 172 200 165 200 158"
                stroke="#B77A50"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
          </CoffeeGlass>
        </g>
      </g>
    </svg>
  );
});

CoffeeScene.displayName = 'CoffeeScene';
