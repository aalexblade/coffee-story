import { forwardRef, useImperativeHandle, useRef } from 'react';
import type { CoffeeVisualHandle } from './coffee-visual/coffeeScene.types';
import { CoffeeScene } from './coffee-visual/CoffeeScene';

export const CoffeeVisual = forwardRef<CoffeeVisualHandle>((_, ref) => {
  const sceneRef = useRef<CoffeeVisualHandle>(null);

  useImperativeHandle(
    ref,
    () => ({
      get root() {
        return sceneRef.current?.root ?? null;
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
      get espressoCup() {
        return sceneRef.current?.espressoCup ?? null;
      },
      get espressoLiquid() {
        return sceneRef.current?.espressoLiquid ?? null;
      },
      get espressoCrema() {
        return sceneRef.current?.espressoCrema ?? null;
      },
      get espressoStream() {
        return sceneRef.current?.espressoStream ?? null;
      },
      get cortado() {
        return sceneRef.current?.cortado ?? null;
      },
      get cortadoGlass() {
        return sceneRef.current?.cortadoGlass ?? null;
      },
      get cortadoLiquid() {
        return sceneRef.current?.cortadoLiquid ?? null;
      },
      get cortadoMilk() {
        return sceneRef.current?.cortadoMilk ?? null;
      },
      get cortadoStream() {
        return sceneRef.current?.cortadoStream ?? null;
      },
    }),
    [],
  );

  return (
    <div>
      <CoffeeScene ref={sceneRef} />
    </div>
  );
});

CoffeeVisual.displayName = 'CoffeeVisual';
