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
  tl.to(
    {},
    {
      duration: HOLD_DURATION,
    },
  );

  /*
   * 2. Espresso exits
   *
   * Slight upward movement + scale down.
   * The crema disappears slightly earlier than the cup.
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
   * 4. Coffee starts filling
   *
   * The rect itself stays in place.
   * Its visible portion is controlled by clip-path.
   *
   * We reveal the coffee from bottom to top using scaleY.
   */
  tl.fromTo(
    cortadoLiquid,
    {
      scaleY: 0.05,
      transformOrigin: 'center bottom',
    },
    {
      scaleY: 1,
      duration: 0.65,
      ease: 'power2.out',
    },
    '<0.15',
  );

  /*
   * 5. Milk stream appears
   */
  tl.fromTo(
    cortadoStream,
    {
      autoAlpha: 0,
      scaleY: 0,
      transformOrigin: 'center top',
    },
    {
      autoAlpha: 1,
      scaleY: 1,
      duration: 0.3,
      ease: 'power2.out',
    },
    '<0.18',
  );

  /*
   * 6. Milk fills the upper layer
   */
  tl.fromTo(
    cortadoMilk,
    {
      scaleY: 0.05,
      transformOrigin: 'center bottom',
    },
    {
      scaleY: 1,
      duration: 0.8,
      ease: 'power2.out',
    },
    '<0.05',
  );

  /*
   * 7. Small settling movement
   *
   * Gives the liquid a subtle "settle" instead of stopping abruptly.
   */
  tl.to(cortadoMilk, {
    scaleY: 1.015,
    duration: 0.12,
    ease: 'power1.out',
  });

  tl.to(cortadoMilk, {
    scaleY: 1,
    duration: 0.18,
    ease: 'power2.out',
  });

  /*
   * 8. Stop pouring
   */
  tl.to(
    cortadoStream,
    {
      autoAlpha: 0,
      scaleY: 0,
      duration: 0.3,
      ease: 'power2.in',
    },
    '<0.02',
  );

  /*
   * 9. Text transition
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
