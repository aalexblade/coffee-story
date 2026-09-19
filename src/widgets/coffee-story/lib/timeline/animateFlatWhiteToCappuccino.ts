import { gsap } from '@/shared/lib/gsap';
import type { CoffeeVisualHandle } from '../../ui/coffee-visual/coffeeScene.types';
import {
  HOLD_DURATION,
  STEP_DURATION,
  TEXT_OFFSET,
} from './timeline.constants';

export function animateFlatWhiteToCappuccino(
  tl: gsap.core.Timeline,
  visual: CoffeeVisualHandle,
  textCards: HTMLElement[],
): void {
  const {
    flatWhiteCup,
    flatWhiteCrema,
    cappuccinoCup,
    cappuccinoCoffee,
    cappuccinoMilk,
    cappuccinoFoam,
    cappuccinoStream,
  } = visual;

  /*
   * 1. Hold Flat White
   */
  tl.to(flatWhiteCup, {
    duration: HOLD_DURATION,
  });

  /*
   * 2. Flat White exits
   */
  tl.to(flatWhiteCup, {
    autoAlpha: 0,
    scale: 0.94,
    y: -10,
    duration: STEP_DURATION,
    ease: 'power2.inOut',
  });

  /*
   * 3. Crema fades slightly before the cup disappears
   */
  tl.to(
    flatWhiteCrema,
    {
      autoAlpha: 0,
      scaleX: 0.94,
      scaleY: 0.94,
      duration: 0.3,
      ease: 'power2.in',
    },
    '<0.05',
  );

  /*
   * 4. Cappuccino cup enters
   */
  tl.to(
    cappuccinoCup,
    {
      autoAlpha: 1,
      scale: 1,
      y: 0,
      duration: STEP_DURATION,
      ease: 'power3.out',
    },
    '<0.2',
  );

  /*
   * 5. Espresso extraction
   */
  tl.fromTo(
    cappuccinoCoffee,
    {
      scaleY: 0.02,
      scaleX: 0.985,
      transformOrigin: 'center bottom',
    },
    {
      scaleY: 1,
      scaleX: 1,
      duration: 0.58,
      ease: 'power2.out',
    },
    '<0.12',
  );

  /*
   * 6. Coffee surface settles
   */
  tl.to(cappuccinoCoffee, {
    scaleX: 1.012,
    duration: 0.1,
    ease: 'power1.out',
  });

  tl.to(cappuccinoCoffee, {
    scaleX: 1,
    duration: 0.16,
    ease: 'power2.out',
  });

  /*
   * 7. Milk stream appears
   */
  tl.fromTo(
    cappuccinoStream,
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
   * 8. Milk layer develops
   */
  tl.fromTo(
    cappuccinoMilk,
    {
      scaleY: 0.02,
      scaleX: 0.985,
      transformOrigin: 'center bottom',
    },
    {
      scaleY: 1,
      scaleX: 1,
      duration: 0.62,
      ease: 'power2.out',
    },
    '<0.04',
  );

  /*
   * 9. Milk surface settles
   */
  tl.to(cappuccinoMilk, {
    scaleX: 1.015,
    scaleY: 1.008,
    duration: 0.1,
    ease: 'power1.out',
  });

  tl.to(cappuccinoMilk, {
    scaleX: 1,
    scaleY: 1,
    duration: 0.18,
    ease: 'power2.out',
  });

  /*
   * 10. Stop pouring
   */
  tl.to(
    cappuccinoStream,
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
   * 11. Thick foam appears
   *
   * Cappuccino should feel softer and more volumetric
   * than the previous drinks.
   */
  tl.fromTo(
    cappuccinoFoam,
    {
      autoAlpha: 0,
      scale: 0.94,
      transformOrigin: 'center bottom',
    },
    {
      autoAlpha: 1,
      scale: 1,
      duration: 0.55,
      ease: 'back.out(1.2)',
    },
    '<0.04',
  );

  /*
   * 12. Foam settles
   */
  tl.to(cappuccinoFoam, {
    scale: 1.015,
    duration: 0.1,
    ease: 'power1.out',
  });

  tl.to(cappuccinoFoam, {
    scale: 1,
    duration: 0.18,
    ease: 'power2.out',
  });

  /*
   * 13. Text transition
   */
  if (textCards[3]) {
    tl.to(
      textCards[3],
      {
        autoAlpha: 0,
        y: -TEXT_OFFSET,
        duration: STEP_DURATION,
        ease: 'power2.inOut',
      },
      '<',
    );
  }

  if (textCards[4]) {
    tl.fromTo(
      textCards[4],
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