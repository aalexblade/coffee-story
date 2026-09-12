import { forwardRef, useImperativeHandle, useRef } from 'react';
import styles from './CoffeeStory.module.css';
import { CoffeeScene } from './coffee-visual/CoffeeScene';
import type {
  CoffeeSceneRefs,
  CoffeeVisualHandle,
} from './coffee-visual/coffeeScene.types';

export const CoffeeVisual = forwardRef<CoffeeVisualHandle>((_, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<CoffeeSceneRefs>(null);

  useImperativeHandle(
    ref,
    () => ({
      get root() {
        return containerRef.current;
      },

      get hero() {
        return sceneRef.current?.hero ?? null;
      },

      get package() {
        return sceneRef.current?.package ?? null;
      },

      get beans() {
        return sceneRef.current?.beans ?? null;
      },

      get espresso() {
        return sceneRef.current?.espresso ?? null;
      },
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
