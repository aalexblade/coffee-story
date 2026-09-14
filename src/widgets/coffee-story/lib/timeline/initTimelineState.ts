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

  // 1. Initial visual states
  gsap.set(
    [
      espressoCup,
      cortadoGlass,
      flatWhiteCup,
      cappuccinoCup,
      latteGlass,
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
      transformOrigin: 'top center',
    },
  );

  // Liquids initial attributes
  gsap.set([espressoLiquid, espressoCrema], { attr: { y: 340 } });
  gsap.set(cortadoLiquid, { attr: { y: 350 } });
  gsap.set(cortadoMilk, { attr: { y: 350 } });
  gsap.set([flatWhiteLiquid, flatWhiteMilk, flatWhiteCrema], {
    attr: { y: 345 },
  });
  gsap.set([cappuccinoCoffee, cappuccinoMilk], { attr: { y: 345 } });
  gsap.set([latteCoffee, latteMilk], { attr: { y: 350 } });

  // 2. Initial text cards state
  textCards.forEach((card, index) => {
    gsap.set(card, {
      autoAlpha: index === 0 ? 1 : 0,
      y: index === 0 ? 0 : 40,
    });
  });
}
