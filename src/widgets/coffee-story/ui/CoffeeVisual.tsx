import { forwardRef } from 'react';
import styles from './CoffeeStory.module.css';
import { CoffeeScene } from './coffee-visual/CoffeeScene';

export const CoffeeVisual = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className={styles.visualContainer}>
      <CoffeeScene />
    </div>
  );
});

CoffeeVisual.displayName = 'CoffeeVisual';