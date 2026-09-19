import { gsap } from '@/shared/lib/gsap';
import type { CoffeeVisualHandle } from '../../ui/coffee-visual/coffeeScene.types';
import {
  HOLD_DURATION,
  STEP_DURATION,
  TEXT_OFFSET,
} from './timeline.constants';

export function animateCappuccinoToLatte(
  tl: gsap.core.Timeline,
  visual: CoffeeVisualHandle,
  textCards: HTMLElement[],
): void {
  const {
    cappuccinoCup,
    cappuccinoFoam,
    latteGlass,
    latteCoffee,
    latteMilk,
    latteFoam,
    latteStream,
    latteArt,
  } = visual;

  /*
   * 1. Hold Cappuccino
   */
  tl.to(cappuccinoCup, {
    duration: HOLD_DURATION,
  });

  /*
   * 2. Cappuccino exits
   */
  tl.to(cappuccinoCup, {
    autoAlpha: 0,
    scale: 0.94,
    y: -10,
    duration: STEP_DURATION,
    ease: 'power2.inOut',
  });

  /*
   * 3. Foam fades slightly before the cup disappears
   */
  tl.to(
    cappuccinoFoam,
    {
      autoAlpha: 0,
      scale: 0.94,
      duration: 0.32,
      ease: 'power2.in',
    },
    '<0.04',
  );

  /*
   * 4. Latte glass enters
   *
   * Taller vessel with a softer upward reveal.
   */
  tl.to(
    latteGlass,
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
   * 5. Espresso enters the bottom of the glass
   */
  tl.fromTo(
    latteCoffee,
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
  tl.to(latteCoffee, {
    scaleX: 1.012,
    duration: 0.1,
    ease: 'power1.out',
  });

  tl.to(latteCoffee, {
    scaleX: 1,
    duration: 0.16,
    ease: 'power2.out',
  });

  /*
   * 7. Milk stream appears
   */
  tl.fromTo(
    latteStream,
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
   * 8. Milk slowly fills the tall latte glass
   *
   * Slower than previous drinks to emphasize
   * the larger milk volume of a latte.
   */
  tl.fromTo(
    latteMilk,
    {
      scaleY: 0.02,
      scaleX: 0.985,
      transformOrigin: 'center bottom',
    },
    {
      scaleY: 1,
      scaleX: 1,
      duration: 1,
      ease: 'power2.out',
    },
    '<0.04',
  );

  /*
   * 9. Milk surface settles
   */
  tl.to(latteMilk, {
    scaleX: 1.012,
    scaleY: 1.006,
    duration: 0.1,
    ease: 'power1.out',
  });

  tl.to(latteMilk, {
    scaleX: 1,
    scaleY: 1,
    duration: 0.2,
    ease: 'power2.out',
  });

  /*
   * 10. Stop pouring
   */
  tl.to(
    latteStream,
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
   * 11. Thin latte foam appears
   *
   * Latte foam should be much subtler than cappuccino foam.
   */
  tl.fromTo(
    latteFoam,
    {
      autoAlpha: 0,
      scale: 0.96,
      transformOrigin: 'center center',
    },
    {
      autoAlpha: 1,
      scale: 1,
      duration: 0.42,
      ease: 'power2.out',
    },
    '<0.04',
  );

  /*
   * 12. Foam settles
   */
  tl.to(latteFoam, {
    scale: 1.008,
    duration: 0.1,
    ease: 'power1.out',
  });

  tl.to(latteFoam, {
    scale: 1,
    duration: 0.16,
    ease: 'power2.out',
  });

  /*
   * 13. Latte art appears last
   *
   * Small scale-up instead of a strong bounce.
   * Keeps the final drink premium and calm.
   */
  tl.fromTo(
    latteArt,
    {
      autoAlpha: 0,
      scale: 0.94,
      transformOrigin: 'center center',
    },
    {
      autoAlpha: 1,
      scale: 1,
      duration: 0.65,
      ease: 'power2.out',
    },
    '<0.08',
  );

  /*
   * 14. Text transition
   */
  if (textCards[4]) {
    tl.to(
      textCards[4],
      {
        autoAlpha: 0,
        y: -TEXT_OFFSET,
        duration: STEP_DURATION,
        ease: 'power2.inOut',
      },
      '<',
    );
  }

  if (textCards[5]) {
    tl.fromTo(
      textCards[5],
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
