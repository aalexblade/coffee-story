import {
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import styles from './CoffeeStory.module.css';
import { CoffeeScene } from './coffee-visual/CoffeeScene';
import type { CoffeeSceneRefs, CoffeeVisualHandle } from './coffee-visual/coffeeScene.types';

export const CoffeeVisual = forwardRef<CoffeeVisualHandle>((_, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<CoffeeSceneRefs>(null);

  useImperativeHandle(
    ref,
    () => ({
      root: containerRef.current,
      hero: sceneRef.current?.hero ?? null,
      package: sceneRef.current?.package ?? null,
      beans: sceneRef.current?.beans ?? null,
      espresso: sceneRef.current?.espresso ?? null,
    }),
    [],
  );

  return (
    <div ref={containerRef} className={styles.visualContainer}>
      <CoffeeScene ref={sceneRef} />
    </div>
  );
});

CoffeeVisual.displayName = 'CoffeeVisual';