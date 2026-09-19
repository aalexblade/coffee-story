import { gsap } from '@/shared/lib/gsap';
import type { CoffeeVisualHandle } from '../../ui/coffee-visual/coffeeScene.types';
import {
  HOLD_DURATION,
  STEP_DURATION,
  TEXT_OFFSET,
} from './timeline.constants';

export function animateCortadoToFlatWhite(
  tl: gsap.core.Timeline,
  visual: CoffeeVisualHandle,
  textCards: HTMLElement[],
): void {
  const {
    cortadoGlass,
    flatWhiteCup,
    flatWhiteLiquid,
    flatWhiteMilk,
    flatWhiteCrema,
    flatWhiteStream,
  } = visual;

  /*
   * 1. Hold Cortado
   */
  tl.to(cortadoGlass, {
    duration: HOLD_DURATION,
  });

  /*
   * 2. Cortado exits
   *
   * Slight upward movement + subtle scale down.
   */
  tl.to(cortadoGlass, {
    autoAlpha: 0,
    scale: 0.94,
    y: -10,
    duration: STEP_DURATION,
    ease: 'power2.inOut',
  });

  /*
   * 3. Flat White cup enters
   */
  tl.to(
    flatWhiteCup,
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
   * 4. Espresso extraction
   *
   * Coffee reaches the bottom first.
   * Slight horizontal settling keeps the fill
   * from looking like a rigid rectangle.
   */
  tl.fromTo(
    flatWhiteLiquid,
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
    '<0.12',
  );

  /*
   * 5. Coffee surface settles
   */
  tl.to(flatWhiteLiquid, {
    scaleX: 1.012,
    duration: 0.1,
    ease: 'power1.out',
  });

  tl.to(flatWhiteLiquid, {
    scaleX: 1,
    duration: 0.16,
    ease: 'power2.out',
  });

  /*
   * 6. Microfoam stream appears
   */
  tl.fromTo(
    flatWhiteStream,
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
   * 7. Microfoam fills the upper layer
   */
  tl.fromTo(
    flatWhiteMilk,
    {
      scaleY: 0.02,
      scaleX: 0.985,
      transformOrigin: 'center bottom',
    },
    {
      scaleY: 1,
      scaleX: 1,
      duration: 0.76,
      ease: 'power2.out',
    },
    '<0.04',
  );

  /*
   * 8. Microfoam surface settles
   */
  tl.to(flatWhiteMilk, {
    scaleX: 1.015,
    scaleY: 1.008,
    duration: 0.1,
    ease: 'power1.out',
  });

  tl.to(flatWhiteMilk, {
    scaleX: 1,
    scaleY: 1,
    duration: 0.18,
    ease: 'power2.out',
  });

  /*
   * 9. Stop pouring
   */
  tl.to(
    flatWhiteStream,
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
   * 10. Crema / microfoam surface appears
   *
   * Subtle scale keeps the transition organic.
   */
  tl.fromTo(
    flatWhiteCrema,
    {
      autoAlpha: 0,
      scaleX: 0.96,
      scaleY: 0.96,
      transformOrigin: 'center center',
    },
    {
      autoAlpha: 1,
      scaleX: 1,
      scaleY: 1,
      duration: 0.4,
      ease: 'power2.out',
    },
    '<0.05',
  );

  /*
   * 11. Text transition
   */
  if (textCards[2]) {
    tl.to(
      textCards[2],
      {
        autoAlpha: 0,
        y: -TEXT_OFFSET,
        duration: STEP_DURATION,
        ease: 'power2.inOut',
      },
      '<',
    );
  }

  if (textCards[3]) {
    tl.fromTo(
      textCards[3],
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
