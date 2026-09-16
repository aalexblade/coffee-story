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

  // Main visual elements
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
    },
  );

  // Coffee streams
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
    },
  );

  // Liquid levels
  gsap.set(espressoLiquid, {
    attr: { y: 340 },
  });

  gsap.set([cortadoLiquid, cortadoMilk], {
    attr: { y: 350 },
  });

  gsap.set([flatWhiteLiquid, flatWhiteMilk], {
    attr: { y: 345 },
  });

  gsap.set([cappuccinoCoffee, cappuccinoMilk], {
    attr: { y: 345 },
  });

  gsap.set([latteCoffee, latteMilk], {
    attr: { y: 350 },
  });

  // Text cards
  textCards.forEach((card, index) => {
    gsap.set(card, {
      autoAlpha: index === 0 ? 1 : 0,
      y: index === 0 ? 0 : 40,
    });
  });
}
