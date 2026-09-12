import styles from './CoffeeScene.module.css';

export function CoffeeScene() {
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
          id="cupShadow"
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
      </defs>

      <g
        className={styles.espressoGroup}
        filter="url(#cupShadow)"
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

        {/* Cup handle */}
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

        {/* Coffee surface */}
        <ellipse
          cx="200"
          cy="220"
          rx="85"
          ry="24"
          fill="url(#espressoGradient)"
        />

        {/* Crema */}
        <ellipse
          cx="200"
          cy="218"
          rx="76"
          ry="17"
          fill="#C9824B"
          opacity="0.85"
        />

        {/* Highlight */}
        <ellipse
          cx="175"
          cy="213"
          rx="25"
          ry="6"
          fill="#F6C28B"
          opacity="0.35"
        />
      </g>
    </svg>
  );
}