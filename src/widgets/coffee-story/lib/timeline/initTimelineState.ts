import { gsap } from '@/shared/lib/gsap';
import type { CoffeeVisualHandle } from '../../ui/coffee-visual/coffeeScene.types';

interface InitTimelineStateParams {
  visual: CoffeeVisualHandle;
  textCards: HTMLElement[];
}

export function initTimelineState({
  visual,
  textCards,
}: InitTimelineStateParams): void {
  if (!visual) return;

  const {
    espressoCup,
    espressoLiquid,
    espressoCrema,
    espressoStream,
    cortadoGlass,
    cortadoLiquid,
    cortadoMilk,
    cortadoStream,
    flatWhiteCup,
    flatWhiteLiquid,
    flatWhiteMilk,
    flatWhiteCrema,
    flatWhiteStream,
    cappuccinoCup,
    cappuccinoCoffee,
    cappuccinoMilk,
    cappuccinoFoam,
    cappuccinoStream,
    latteGlass,
    latteCoffee,
    latteMilk,
    latteFoam,
    latteStream,
    latteArt,
  } = visual;

  /*
   * Vessels + surfaces
   */
  gsap.set(
    [
      espressoCup,
      cortadoGlass,
      flatWhiteCup,
      cappuccinoCup,
      latteGlass,
      espressoCrema,
      flatWhiteCrema,
      cappuccinoFoam,
      latteFoam,
      latteArt,
    ],
    {
      autoAlpha: 0,
      scale: 0.92,
      transformOrigin: 'center center',
    },
  );

  /*
   * Coffee streams
   */
  gsap.set(
    [
      espressoStream,
      cortadoStream,
      flatWhiteStream,
      cappuccinoStream,
      latteStream,
    ],
    {
      autoAlpha: 0,
      scaleY: 0,
      transformOrigin: 'center top',
    },
  );

  /*
   * Liquid layers
   *
   * All liquids reveal from bottom → top.
   */
  gsap.set(
    [
      espressoLiquid,
      cortadoLiquid,
      cortadoMilk,
      flatWhiteLiquid,
      flatWhiteMilk,
      cappuccinoCoffee,
      cappuccinoMilk,
      latteCoffee,
      latteMilk,
    ],
    {
      scaleY: 0,
      transformOrigin: 'center bottom',
    },
  );

  /*
   * Text cards
   */
  textCards.forEach((card, index) => {
    gsap.set(card, {
      autoAlpha: index === 0 ? 1 : 0,
      y: index === 0 ? 0 : 40,
    });
  });
}
