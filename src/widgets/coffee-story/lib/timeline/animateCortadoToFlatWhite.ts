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
   * 1. Finish Cortado
   */
  tl.to(
    cortadoGlass,
    {
      autoAlpha: 0,
      scale: 0.94,
      y: -10,
      duration: STEP_DURATION,
      ease: 'power2.inOut',
    },
    `+=${HOLD_DURATION}`,
  );

  /*
   * 2. Prepare Flat White cup
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
   * 3. Espresso extraction
   */
  tl.to(flatWhiteStream, {
    autoAlpha: 1,
    scaleY: 1,
    duration: 0.35,
    ease: 'power2.out',
  });

  tl.fromTo(
    flatWhiteLiquid,
    {
      scaleY: 0,
      transformOrigin: 'center bottom',
    },
    {
      scaleY: 1,
      duration: 0.7,
      ease: 'power2.out',
    },
    '<',
  );

  /*
   * 4. Microfoam
   */
  tl.fromTo(
    flatWhiteMilk,
    {
      scaleY: 0,
      transformOrigin: 'center bottom',
    },
    {
      scaleY: 1,
      duration: 0.8,
      ease: 'power2.out',
    },
    '<0.15',
  );

  /*
   * 5. Finish extraction
   */
  tl.to(flatWhiteStream, {
    autoAlpha: 0,
    scaleY: 0,
    duration: 0.3,
    ease: 'power2.in',
  });

  /*
   * 6. Crema / microfoam surface
   */
  tl.to(
    flatWhiteCrema,
    {
      autoAlpha: 1,
      scaleX: 1,
      duration: 0.45,
      ease: 'power2.out',
    },
    '<0.05',
  );

  /*
   * 7. Text transition
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
