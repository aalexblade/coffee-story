import {
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import styles from './CoffeeScene.module.css';
import type { CoffeeSceneRefs } from './coffeeScene.types';

export const CoffeeScene = forwardRef<CoffeeSceneRefs>(
  (_, ref) => {
    const heroRef = useRef<SVGGElement>(null);
    const packageRef = useRef<SVGGElement>(null);
    const beansRef = useRef<SVGGElement>(null);

    const espressoRef = useRef<SVGGElement>(null);
    const espressoCupRef = useRef<SVGGElement>(null);
    const espressoLiquidRef = useRef<SVGGElement>(null);
    const espressoCremaRef = useRef<SVGGElement>(null);
    const espressoStreamRef = useRef<SVGPathElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        hero: heroRef.current,
        package: packageRef.current,
        beans: beansRef.current,

        espresso: espressoRef.current,
        espressoCup: espressoCupRef.current,
        espressoLiquid: espressoLiquidRef.current,
        espressoCrema: espressoCremaRef.current,
        espressoStream: espressoStreamRef.current,
      }),
      [],
    );

    return (
      <svg
        className={styles.scene}
        viewBox="0 0 400 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="packageGradient"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="#2C1A14" />
            <stop offset="100%" stopColor="#6F3E2A" />
          </linearGradient>

          <linearGradient
            id="espressoGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#8B4A2F" />
            <stop offset="100%" stopColor="#2C1A14" />
          </linearGradient>

          <linearGradient
            id="cupGradient"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="#FFFDF8" />
            <stop offset="100%" stopColor="#E8DED2" />
          </linearGradient>

          <filter
            id="sceneShadow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feDropShadow
              dx="0"
              dy="20"
              stdDeviation="18"
              floodColor="#2C1A14"
              floodOpacity="0.18"
            />
          </filter>

          <clipPath id="espressoCupClip">
            <path
              d="
                M125 220
                H275
                L258 342
                Q200 370 142 342
                Z
              "
            />
          </clipPath>
        </defs>

        {/* HERO */}
        <g ref={heroRef}>
          <g
            ref={packageRef}
            className={styles.packageGroup}
            filter="url(#sceneShadow)"
          >
            <rect
              x="115"
              y="105"
              width="170"
              height="245"
              rx="18"
              fill="url(#packageGradient)"
            />

            <rect
              x="132"
              y="135"
              width="136"
              height="115"
              rx="12"
              fill="#F7F1E9"
            />

            <text
              x="200"
              y="175"
              textAnchor="middle"
              className={styles.packageBrand}
            >
              COFFEE
            </text>

            <text
              x="200"
              y="205"
              textAnchor="middle"
              className={styles.packageName}
            >
              STORY
            </text>

            <circle
              cx="200"
              cy="290"
              r="38"
              fill="#C9824B"
              opacity="0.9"
            />
          </g>

          <g ref={beansRef} className={styles.beansGroup}>
            <ellipse
              cx="95"
              cy="340"
              rx="18"
              ry="11"
              transform="rotate(-28 95 340)"
              fill="#4B2A1E"
            />

            <ellipse
              cx="310"
              cy="345"
              rx="18"
              ry="11"
              transform="rotate(32 310 345)"
              fill="#4B2A1E"
            />

            <ellipse
              cx="120"
              cy="390"
              rx="18"
              ry="11"
              transform="rotate(18 120 390)"
              fill="#6A3B28"
            />

            <ellipse
              cx="285"
              cy="400"
              rx="18"
              ry="11"
              transform="rotate(-20 285 400)"
              fill="#6A3B28"
            />

            <ellipse
              cx="80"
              cy="250"
              rx="16"
              ry="10"
              transform="rotate(45 80 250)"
              fill="#5A301F"
            />

            <ellipse
              cx="325"
              cy="245"
              rx="16"
              ry="10"
              transform="rotate(-40 325 245)"
              fill="#5A301F"
            />
          </g>
        </g>

        {/* ESPRESSO */}
        <g ref={espressoRef} className={styles.espressoGroup}>
          {/* Coffee stream */}
          <path
            ref={espressoStreamRef}
            className={styles.espressoStream}
            d="M200 70 L200 220"
            stroke="url(#espressoGradient)"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Cup */}
          <g
            ref={espressoCupRef}
            filter="url(#sceneShadow)"
          >
            {/* Saucer */}
            <ellipse
              cx="200"
              cy="390"
              rx="125"
              ry="26"
              fill="#DED4C8"
            />

            <ellipse
              cx="200"
              cy="382"
              rx="110"
              ry="20"
              fill="#F7F1E9"
            />

            {/* Cup body */}
            <path
              d="
                M115 220
                H285
                L265 355
                Q200 390 135 355
                Z
              "
              fill="url(#cupGradient)"
            />

            {/* Handle */}
            <path
              d="
                M285 250
                H320
                Q350 250 350 290
                Q350 330 315 330
                H275
              "
              stroke="#E8DED2"
              strokeWidth="20"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* Liquid */}
          <g
            ref={espressoLiquidRef}
            clipPath="url(#espressoCupClip)"
          >
            <rect
              x="115"
              y="220"
              width="170"
              height="140"
              fill="url(#espressoGradient)"
            />
          </g>

          {/* Crema */}
          <g ref={espressoCremaRef}>
            <ellipse
              cx="200"
              cy="220"
              rx="76"
              ry="17"
              fill="#C9824B"
            />

            <ellipse
              cx="175"
              cy="213"
              rx="25"
              ry="6"
              fill="#F6C28B"
              opacity="0.35"
            />
          </g>
        </g>
      </svg>
    );
  },
);

CoffeeScene.displayName = 'CoffeeScene';