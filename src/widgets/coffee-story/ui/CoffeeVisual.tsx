'use client';

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
      get flatWhite() {
        return sceneRef.current?.flatWhite ?? null;
      },
      get flatWhiteCup() {
        return sceneRef.current?.flatWhiteCup ?? null;
      },
      get flatWhiteLiquid() {
        return sceneRef.current?.flatWhiteLiquid ?? null;
      },
      get flatWhiteMilk() {
        return sceneRef.current?.flatWhiteMilk ?? null;
      },
      get flatWhiteCrema() {
        return sceneRef.current?.flatWhiteCrema ?? null;
      },
      get flatWhiteStream() {
        return sceneRef.current?.flatWhiteStream ?? null;
      },
      get cappuccino() {
        return sceneRef.current?.cappuccino ?? null;
      },
      get cappuccinoCup() {
        return sceneRef.current?.cappuccinoCup ?? null;
      },
      get cappuccinoCoffee() {
        return sceneRef.current?.cappuccinoCoffee ?? null;
      },
      get cappuccinoMilk() {
        return sceneRef.current?.cappuccinoMilk ?? null;
      },
      get cappuccinoFoam() {
        return sceneRef.current?.cappuccinoFoam ?? null;
      },
      get cappuccinoStream() {
        return sceneRef.current?.cappuccinoStream ?? null;
      },
      get latte() {
        return sceneRef.current?.latte ?? null;
      },
      get latteGlass() {
        return sceneRef.current?.latteGlass ?? null;
      },
      get latteCoffee() {
        return sceneRef.current?.latteCoffee ?? null;
      },
      get latteMilk() {
        return sceneRef.current?.latteMilk ?? null;
      },
      get latteFoam() {
        return sceneRef.current?.latteFoam ?? null;
      },
      get latteStream() {
        return sceneRef.current?.latteStream ?? null;
      },
      get latteArt() {
        return sceneRef.current?.latteArt ?? null;
      },
    }),
    [],
  );

  return <CoffeeScene ref={sceneRef} />;
});

CoffeeVisual.displayName = 'CoffeeVisual';
