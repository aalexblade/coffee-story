import { gsap } from '@/shared/lib/gsap';
import type { CoffeeVisualHandle } from '../../ui/coffee-visual/coffeeScene.types';

export function initTimelineState(
  visual: CoffeeVisualHandle,
  textCards: HTMLElement[],
): void {
  const {
    hero,
    package: packageEl,
    beans,
    espresso,
    espressoCup,
    espressoLiquid,
    espressoCrema,
    espressoStream,
    cortado,
    cortadoGlass,
    cortadoLiquid,
    cortadoMilk,
    cortadoStream,
    flatWhite,
    flatWhiteCup,
    flatWhiteLiquid,
    flatWhiteMilk,
    flatWhiteCrema,
    flatWhiteStream,
    cappuccino,
    cappuccinoCup,
    cappuccinoCoffee,
    cappuccinoMilk,
    cappuccinoFoam,
    cappuccinoStream,
  } = visual;

  /*
   * Initial text cards state
   */
  textCards.forEach((card, index) => {
    if (index === 0) {
      gsap.set(card, {
        autoAlpha: 1,
        y: 0,
      });
    } else {
      gsap.set(card, {
        autoAlpha: 0,
        y: 40,
      });
    }
  });

  /*
   * Initial visual state: HERO
   */
  if (hero) {
    gsap.set(hero, {
      autoAlpha: 1,
    });
  }

  if (packageEl) {
    gsap.set(packageEl, {
      autoAlpha: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      transformOrigin: 'center center',
    });
  }

  if (beans) {
    gsap.set(beans, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      transformOrigin: 'center center',
    });
  }

  /*
   * Initial visual state: ESPRESSO
   */
  if (espresso) {
    gsap.set(espresso, {
      autoAlpha: 1,
    });
  }

  if (espressoCup) {
    gsap.set(espressoCup, {
      autoAlpha: 0,
      y: 40,
      scale: 0.9,
      transformOrigin: 'center center',
    });
  }

  if (espressoLiquid) {
    gsap.set(espressoLiquid, {
      attr: {
        y: 360,
      },
    });
  }

  if (espressoCrema) {
    gsap.set(espressoCrema, {
      autoAlpha: 0,
      scaleX: 0.7,
      transformOrigin: 'center center',
    });
  }

  if (espressoStream) {
    gsap.set(espressoStream, {
      autoAlpha: 0,
      scaleY: 0,
      transformOrigin: 'top center',
    });
  }

  /*
   * Initial visual state: CORTADO
   */
  if (cortado) {
    gsap.set(cortado, {
      autoAlpha: 1,
    });
  }

  if (cortadoGlass) {
    gsap.set(cortadoGlass, {
      autoAlpha: 0,
      y: 35,
      scale: 0.92,
      transformOrigin: 'center center',
    });
  }

  if (cortadoLiquid) {
    gsap.set(cortadoLiquid, {
      attr: {
        y: 360,
      },
    });
  }

  if (cortadoMilk) {
    gsap.set(cortadoMilk, {
      attr: {
        y: 360,
      },
    });
  }

  if (cortadoStream) {
    gsap.set(cortadoStream, {
      autoAlpha: 0,
      scaleY: 0,
      transformOrigin: 'top center',
    });
  }

  /*
   * Initial visual state: FLAT WHITE
   */
  if (flatWhite) {
    gsap.set(flatWhite, {
      autoAlpha: 1,
    });
  }

  if (flatWhiteCup) {
    gsap.set(flatWhiteCup, {
      autoAlpha: 0,
      y: 35,
      scale: 0.92,
      transformOrigin: 'center center',
    });
  }

  if (flatWhiteLiquid) {
    gsap.set(flatWhiteLiquid, {
      attr: {
        y: 360,
      },
    });
  }

  if (flatWhiteMilk) {
    gsap.set(flatWhiteMilk, {
      attr: {
        y: 360,
      },
    });
  }

  if (flatWhiteCrema) {
    gsap.set(flatWhiteCrema, {
      autoAlpha: 0,
      scaleX: 0.8,
      transformOrigin: 'center center',
    });
  }

  if (flatWhiteStream) {
    gsap.set(flatWhiteStream, {
      autoAlpha: 0,
      scaleY: 0,
      transformOrigin: 'top center',
    });
  }

  /*
   * Initial visual state: CAPPUCCINO
   */
  if (cappuccino) {
    gsap.set(cappuccino, {
      autoAlpha: 1,
    });
  }

  if (cappuccinoCup) {
    gsap.set(cappuccinoCup, {
      autoAlpha: 0,
      y: 30,
      scale: 0.9,
      transformOrigin: 'center center',
    });
  }

  if (cappuccinoCoffee) {
    gsap.set(cappuccinoCoffee, {
      attr: {
        y: 360,
      },
    });
  }

  if (cappuccinoMilk) {
    gsap.set(cappuccinoMilk, {
      attr: {
        y: 360,
      },
    });
  }

  if (cappuccinoFoam) {
    gsap.set(cappuccinoFoam, {
      autoAlpha: 0,
      scale: 0.75,
      transformOrigin: 'center center',
    });
  }

  if (cappuccinoStream) {
    gsap.set(cappuccinoStream, {
      autoAlpha: 0,
      scaleY: 0,
      transformOrigin: 'top center',
    });
  }
}
