import { gsap } from '@/shared/lib/gsap';
import type { CoffeeVisualHandle } from '../../ui/coffee-visual/coffeeScene.types';
import { TEXT_OFFSET } from './timeline.constants';

export function initTimelineState(
  visual: CoffeeVisualHandle,
  textCards: HTMLElement[],
): void {
  const {
    hero,
    package: coffeePackage,
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
  } = visual;

  /*
   * Initial text state
   */
  gsap.set(textCards, {
    autoAlpha: 0,
    y: TEXT_OFFSET,
  });

  if (textCards[0]) {
    gsap.set(textCards[0], {
      autoAlpha: 1,
      y: 0,
    });
  }

  /*
   * Initial visual state: HERO
   */
  if (hero) {
    gsap.set(hero, {
      autoAlpha: 1,
      scale: 1,
      transformOrigin: 'center center',
    });
  }

  if (coffeePackage) {
    gsap.set(coffeePackage, {
      autoAlpha: 1,
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
      rotation: 0,
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
      y: 50,
      scale: 0.88,
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
      scaleX: 0.8,
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
      scale: 0.92,
      y: 30,
      transformOrigin: 'center center',
    });
  }

  if (cortadoLiquid && cortadoMilk) {
    gsap.set([cortadoLiquid, cortadoMilk], {
      attr: {
        y: 350,
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
}