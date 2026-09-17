'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import styles from './CoffeeScene.module.css';
import type { CoffeeVisualHandle } from './coffeeScene.types';
import { CoffeeCup } from './primitives/CoffeeCup';
import { CoffeeGlass } from './primitives/CoffeeGlass';

export const CoffeeScene = forwardRef<CoffeeVisualHandle>((_, ref) => {
  const rootRef = useRef<SVGSVGElement>(null);

  useImperativeHandle(ref, () => {
    const getEl = <T extends SVGElement>(selector: string) =>
      rootRef.current?.querySelector<T>(`[data-ref="${selector}"]`) ?? null;

    return {
      get root() {
        return rootRef.current;
      },
      get hero() {
        return getEl<SVGGElement>('hero');
      },
      get package() {
        return getEl<SVGGElement>('package');
      },
      get beans() {
        return getEl<SVGGElement>('beans');
      },
      get espresso() {
        return getEl<SVGGElement>('espresso');
      },
      get espressoCup() {
        return getEl<SVGGElement>('espressoCup');
      },
      get espressoLiquid() {
        return getEl<SVGRectElement>('espressoLiquid');
      },
      get espressoCrema() {
        return getEl<SVGGElement>('espressoCrema');
      },
      get espressoStream() {
        return getEl<SVGPathElement>('espressoStream');
      },
      get cortado() {
        return getEl<SVGGElement>('cortado');
      },
      get cortadoGlass() {
        return getEl<SVGGElement>('cortadoGlass');
      },
      get cortadoLiquid() {
        return getEl<SVGRectElement>('cortadoLiquid');
      },
      get cortadoMilk() {
        return getEl<SVGRectElement>('cortadoMilk');
      },
      get cortadoStream() {
        return getEl<SVGPathElement>('cortadoStream');
      },
      get flatWhite() {
        return getEl<SVGGElement>('flatWhite');
      },
      get flatWhiteCup() {
        return getEl<SVGGElement>('flatWhiteCup');
      },
      get flatWhiteLiquid() {
        return getEl<SVGRectElement>('flatWhiteLiquid');
      },
      get flatWhiteMilk() {
        return getEl<SVGRectElement>('flatWhiteMilk');
      },
      get flatWhiteCrema() {
        return getEl<SVGGElement>('flatWhiteCrema');
      },
      get flatWhiteStream() {
        return getEl<SVGPathElement>('flatWhiteStream');
      },
      get cappuccino() {
        return getEl<SVGGElement>('cappuccino');
      },
      get cappuccinoCup() {
        return getEl<SVGGElement>('cappuccinoCup');
      },
      get cappuccinoCoffee() {
        return getEl<SVGRectElement>('cappuccinoCoffee');
      },
      get cappuccinoMilk() {
        return getEl<SVGRectElement>('cappuccinoMilk');
      },
      get cappuccinoFoam() {
        return getEl<SVGGElement>('cappuccinoFoam');
      },
      get cappuccinoStream() {
        return getEl<SVGPathElement>('cappuccinoStream');
      },
      get latte() {
        return getEl<SVGGElement>('latte');
      },
      get latteGlass() {
        return getEl<SVGGElement>('latteGlass');
      },
      get latteCoffee() {
        return getEl<SVGRectElement>('latteCoffee');
      },
      get latteMilk() {
        return getEl<SVGRectElement>('latteMilk');
      },
      get latteFoam() {
        return getEl<SVGGElement>('latteFoam');
      },
      get latteStream() {
        return getEl<SVGPathElement>('latteStream');
      },
      get latteArt() {
        return getEl<SVGGElement>('latteArt');
      },
    };
  }, []);

  return (
    <svg
      ref={rootRef}
      viewBox="0 0 400 400"
      className={styles.svg}
      aria-hidden="true"
    >
      <defs>
        {/* Coffee */}
        <linearGradient id="coffeeGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#70442F" />
          <stop offset="45%" stopColor="#4A2B20" />
          <stop offset="100%" stopColor="#24130D" />
        </linearGradient>

        {/* Milk */}
        <linearGradient id="milkGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF9F2" />
          <stop offset="100%" stopColor="#E4D5C4" />
        </linearGradient>

        {/* Warm latte milk */}
        <linearGradient id="warmMilkGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F5E7D4" />
          <stop offset="100%" stopColor="#D7BFA4" />
        </linearGradient>

        {/* Crema */}
        <radialGradient id="cremaGradient">
          <stop offset="0%" stopColor="#E5AF79" />
          <stop offset="65%" stopColor="#C98C5A" />
          <stop offset="100%" stopColor="#9A603D" />
        </radialGradient>

        {/* Cappuccino foam */}
        <linearGradient id="foamGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFDF9" />
          <stop offset="100%" stopColor="#EADBCB" />
        </linearGradient>

        {/* Glass highlight */}
        <linearGradient id="glassHighlight" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="42%" stopColor="#FFFFFF" stopOpacity="0.05" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.48" />
          <stop offset="58%" stopColor="#FFFFFF" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        {/* Soft shadow */}
        <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="7" />
        </filter>

        {/* Package highlight */}
        <linearGradient id="packageGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4A3329" />
          <stop offset="55%" stopColor="#3C2A21" />
          <stop offset="100%" stopColor="#241712" />
        </linearGradient>
      </defs>

      {/* Ambient background */}
      <circle cx="200" cy="200" r="145" fill="#F4E8D8" fillOpacity="0.18" />

      <circle
        cx="200"
        cy="300"
        r="95"
        fill="#3C2A21"
        fillOpacity="0.08"
        filter="url(#softShadow)"
      />

      {/* =========================
          HERO
      ========================= */}

      <g data-ref="hero">
        <g data-ref="package">
          <rect
            x="140"
            y="120"
            width="120"
            height="170"
            rx="16"
            fill="url(#packageGradient)"
          />

          <rect x="155" y="145" width="90" height="120" rx="8" fill="#D5CEA3" />

          <rect
            x="160"
            y="150"
            width="80"
            height="110"
            rx="6"
            fill="#E4DDB8"
            fillOpacity="0.45"
          />

          <circle cx="200" cy="185" r="18" fill="#1A120B" />

          <circle cx="195" cy="180" r="5" fill="#FFFFFF" fillOpacity="0.08" />
        </g>

        <g data-ref="beans">
          <ellipse cx="140" cy="310" rx="14" ry="9" fill="#1A120B" />

          <path
            d="M134 310 C139 306 145 306 148 309"
            fill="none"
            stroke="#6F432E"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <ellipse cx="260" cy="315" rx="13" ry="8" fill="#1A120B" />

          <path
            d="M255 315 C259 311 264 311 268 314"
            fill="none"
            stroke="#6F432E"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      </g>

      {/* =========================
          ESPRESSO
      ========================= */}

      <g data-ref="espresso">
        <path
          data-ref="espressoStream"
          d="M200 70 L200 240"
          stroke="#4A2B20"
          strokeWidth="6"
          strokeLinecap="round"
        />

        <g data-ref="espressoCup">
          <CoffeeCup handle={true}>
            <rect
              data-ref="espressoLiquid"
              x="120"
              y="255"
              width="160"
              height="80"
              fill="url(#coffeeGradient)"
            />

            <g data-ref="espressoCrema">
              <ellipse
                cx="200"
                cy="255"
                rx="76"
                ry="12"
                fill="url(#cremaGradient)"
              />

              <ellipse
                cx="185"
                cy="253"
                rx="20"
                ry="3"
                fill="#F4C18F"
                fillOpacity="0.28"
              />
            </g>
          </CoffeeCup>
        </g>
      </g>

      {/* =========================
          CORTADO
      ========================= */}

      <g data-ref="cortado">
        <path
          data-ref="cortadoStream"
          d="M200 60 L200 220"
          stroke="#E8DCCF"
          strokeWidth="7"
          strokeLinecap="round"
        />

        <g data-ref="cortadoGlass">
          <CoffeeGlass>
            <rect
              data-ref="cortadoLiquid"
              x="130"
              y="285"
              width="140"
              height="60"
              fill="url(#coffeeGradient)"
            />

            <rect
              data-ref="cortadoMilk"
              x="130"
              y="225"
              width="140"
              height="60"
              fill="url(#milkGradient)"
            />

            <rect
              x="130"
              y="225"
              width="140"
              height="120"
              fill="url(#glassHighlight)"
              opacity="0.32"
            />
          </CoffeeGlass>
        </g>
      </g>

      {/* =========================
          FLAT WHITE
      ========================= */}

      <g data-ref="flatWhite">
        <path
          data-ref="flatWhiteStream"
          d="M200 60 L200 220"
          stroke="#F4E8D8"
          strokeWidth="8"
          strokeLinecap="round"
        />

        <g data-ref="flatWhiteCup">
          <CoffeeCup handle={true}>
            <rect
              data-ref="flatWhiteLiquid"
              x="115"
              y="270"
              width="170"
              height="70"
              fill="url(#coffeeGradient)"
            />

            <rect
              data-ref="flatWhiteMilk"
              x="115"
              y="220"
              width="170"
              height="50"
              fill="url(#milkGradient)"
            />

            <g data-ref="flatWhiteCrema">
              <ellipse
                cx="200"
                cy="220"
                rx="84"
                ry="12"
                fill="url(#cremaGradient)"
              />

              <ellipse
                cx="180"
                cy="218"
                rx="24"
                ry="3"
                fill="#F3C99D"
                fillOpacity="0.2"
              />
            </g>
          </CoffeeCup>
        </g>
      </g>

      {/* =========================
          CAPPUCCINO
      ========================= */}

      <g data-ref="cappuccino">
        <path
          data-ref="cappuccinoStream"
          d="M200 55 L200 215"
          stroke="#F4E8D8"
          strokeWidth="9"
          strokeLinecap="round"
        />

        <g data-ref="cappuccinoCup">
          <CoffeeCup handle={true}>
            <rect
              data-ref="cappuccinoCoffee"
              x="115"
              y="280"
              width="170"
              height="60"
              fill="url(#coffeeGradient)"
            />

            <rect
              data-ref="cappuccinoMilk"
              x="115"
              y="220"
              width="170"
              height="60"
              fill="url(#milkGradient)"
            />

            <g data-ref="cappuccinoFoam">
              <path
                d="M112 215 C130 195 170 190 200 195 C230 190 270 195 288 215 Z"
                fill="url(#foamGradient)"
              />

              <ellipse
                cx="185"
                cy="207"
                rx="30"
                ry="6"
                fill="#FFFFFF"
                fillOpacity="0.24"
              />
            </g>
          </CoffeeCup>
        </g>
      </g>

      {/* =========================
          LATTE
      ========================= */}

      <g data-ref="latte">
        <path
          data-ref="latteStream"
          d="M200 55 L200 170"
          stroke="#DCC7AD"
          strokeWidth="9"
          strokeLinecap="round"
        />

        <g data-ref="latteGlass">
          <CoffeeGlass variant="tall">
            <rect
              data-ref="latteCoffee"
              x="140"
              y="300"
              width="120"
              height="50"
              fill="url(#coffeeGradient)"
            />

            <rect
              data-ref="latteMilk"
              x="140"
              y="175"
              width="120"
              height="125"
              fill="url(#warmMilkGradient)"
            />

            <g data-ref="latteFoam">
              <ellipse
                cx="200"
                cy="164"
                rx="56"
                ry="8"
                fill="url(#foamGradient)"
              />
            </g>

            <g data-ref="latteArt">
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

              <path
                d="M192 160 C188 164 188 168 192 171"
                fill="none"
                stroke="#E9B886"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.8"
              />

              <path
                d="M208 160 C212 164 212 168 208 171"
                fill="none"
                stroke="#E9B886"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.8"
              />
            </g>

            <rect
              x="140"
              y="165"
              width="120"
              height="185"
              fill="url(#glassHighlight)"
              opacity="0.28"
            />
          </CoffeeGlass>
        </g>
      </g>
    </svg>
  );
});

CoffeeScene.displayName = 'CoffeeScene';
