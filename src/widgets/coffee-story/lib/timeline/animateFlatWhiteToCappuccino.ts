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

  // 1. Finish Flat White
  tl.to(
    flatWhiteCup,
    {
      autoAlpha: 0,
      scale: 0.94,
      y: -10,
      duration: STEP_DURATION,
      ease: 'power2.inOut',
    },
    `+=${HOLD_DURATION}`,
  );

  tl.to(
    flatWhiteCrema,
    {
      autoAlpha: 0,
      duration: 0.35,
    },
    '<',
  );

  // 2. Cappuccino cup enters
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

  // 3. Espresso
  tl.to(cappuccinoStream, {
    autoAlpha: 1,
    scaleY: 1,
    duration: 0.35,
    ease: 'power2.out',
  });

  tl.to(
    cappuccinoCoffee,
    {
      attr: {
        y: 285,
      },
      duration: 0.65,
      ease: 'power2.out',
    },
    '<',
  );

  // 4. Milk
  tl.to(
    cappuccinoMilk,
    {
      attr: {
        y: 240,
      },
      duration: 0.65,
      ease: 'power2.out',
    },
    '<0.1',
  );

  // 5. Stop stream
  tl.to(cappuccinoStream, {
    autoAlpha: 0,
    scaleY: 0,
    duration: 0.3,
    ease: 'power2.in',
  });

  // 6. Thick foam
  tl.to(
    cappuccinoFoam,
    {
      autoAlpha: 1,
      scale: 1,
      duration: 0.65,
      ease: 'back.out(1.4)',
    },
    '<0.05',
  );

  // 7. Text transition
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
