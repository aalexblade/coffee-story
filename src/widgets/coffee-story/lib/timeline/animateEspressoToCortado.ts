import { gsap } from '@/shared/lib/gsap';
import type { CoffeeVisualHandle } from '../../ui/coffee-visual/coffeeScene.types';
import {
  HOLD_DURATION,
  STEP_DURATION,
  TEXT_OFFSET,
} from './timeline.constants';

export function animateEspressoToCortado(
  tl: gsap.core.Timeline,
  visual: CoffeeVisualHandle,
  textCards: HTMLElement[],
): void {
  const {
    espressoCup,
    espressoCrema,
    cortadoGlass,
    cortadoStream,
    cortadoLiquid,
    cortadoMilk,
  } = visual;

  /*
   * 1. Hold espresso
   */
  tl.to(espressoCup, {
    duration: HOLD_DURATION,
  });

  /*
   * 2. Espresso exits
   */
  tl.to(espressoCrema, {
    autoAlpha: 0,
    scaleX: 0.92,
    duration: 0.35,
    ease: 'power2.in',
  });

  tl.to(
    espressoCup,
    {
      autoAlpha: 0,
      y: -14,
      scale: 0.94,
      duration: STEP_DURATION,
      ease: 'power2.inOut',
    },
    '<0.05',
  );

  /*
   * 3. Cortado glass enters
   */
  tl.to(
    cortadoGlass,
    {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: STEP_DURATION,
      ease: 'power3.out',
    },
    '<0.2',
  );

  /*
   * 4. Espresso settles into the glass
   *
   * Slightly faster than milk.
   * This creates the impression that the coffee
   * reaches the bottom before the milk layer develops.
   */
  tl.fromTo(
    cortadoLiquid,
    {
      scaleY: 0.02,
      scaleX: 0.985,
      transformOrigin: 'center bottom',
    },
    {
      scaleY: 1,
      scaleX: 1,
      duration: 0.6,
      ease: 'power2.out',
    },
    '<0.12',
  );

  /*
   * 5. Coffee surface settles
   *
   * Very subtle horizontal movement.
   * Avoids the mechanical "rectangle fill" look.
   */
  tl.to(cortadoLiquid, {
    scaleX: 1.012,
    duration: 0.1,
    ease: 'power1.out',
  });

  tl.to(cortadoLiquid, {
    scaleX: 1,
    duration: 0.16,
    ease: 'power2.out',
  });

  /*
   * 6. Milk stream appears
   *
   * The stream starts slightly before the milk layer.
   */
  tl.fromTo(
    cortadoStream,
    {
      autoAlpha: 0,
      scaleY: 0,
      scaleX: 0.92,
      transformOrigin: 'center top',
    },
    {
      autoAlpha: 1,
      scaleY: 1,
      scaleX: 1,
      duration: 0.28,
      ease: 'power2.out',
    },
    '<0.02',
  );

  /*
   * 7. Milk fills the upper layer
   */
  tl.fromTo(
    cortadoMilk,
    {
      scaleY: 0.02,
      scaleX: 0.985,
      transformOrigin: 'center bottom',
    },
    {
      scaleY: 1,
      scaleX: 1,
      duration: 0.72,
      ease: 'power2.out',
    },
    '<0.04',
  );

  /*
   * 8. Milk surface settles
   */
  tl.to(cortadoMilk, {
    scaleX: 1.015,
    scaleY: 1.008,
    duration: 0.1,
    ease: 'power1.out',
  });

  tl.to(cortadoMilk, {
    scaleX: 1,
    scaleY: 1,
    duration: 0.18,
    ease: 'power2.out',
  });

  /*
   * 9. Stop pouring
   */
  tl.to(
    cortadoStream,
    {
      autoAlpha: 0,
      scaleY: 0.15,
      scaleX: 0.94,
      duration: 0.22,
      ease: 'power2.in',
    },
    '<0.03',
  );

  /*
   * 10. Text transition
   */
  if (textCards[1]) {
    tl.to(
      textCards[1],
      {
        autoAlpha: 0,
        y: -TEXT_OFFSET,
        duration: STEP_DURATION,
        ease: 'power2.inOut',
      },
      '<',
    );
  }

  if (textCards[2]) {
    tl.fromTo(
      textCards[2],
      {
        autoAlpha: 0,
        y: TEXT_OFFSET,
      },
      {
        autoAlpha: 1,
        y: 0,
        duration: STEP_DURATION,
        ease: 'power2.out',
      },
      '<',
    );
  }
}
