import { forwardRef } from 'react';
import styles from './CoffeeStory.module.css';

export const CoffeeVisual = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div className={styles.visualContainer}>
      <div ref={ref} className={styles.visualPlaceholder}>
        <span className={styles.visualLabel}>Espresso Cup Placeholder</span>
      </div>
    </div>
  );
});

CoffeeVisual.displayName = 'CoffeeVisual';