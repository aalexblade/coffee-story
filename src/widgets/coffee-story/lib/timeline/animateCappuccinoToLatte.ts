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

  // Cappuccino exits
  tl.to(
    cappuccinoCup,
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
    cappuccinoFoam,
    {
      autoAlpha: 0,
      duration: 0.4,
    },
    '<',
  );

  // Latte glass enters
  tl.to(
    latteGlass,
    {
      autoAlpha: 1,
      scale: 1,
      y: 0,
      duration: STEP_DURATION,
      ease: 'power3.out',
    },
    '<0.15',
  );

  // Coffee
  tl.to(latteStream, {
    autoAlpha: 1,
    scaleY: 1,
    duration: 0.35,
    ease: 'power2.out',
  });

  tl.to(
    latteCoffee,
    {
      attr: {
        y: 300,
      },
      duration: 0.55,
      ease: 'power2.out',
    },
    '<',
  );

  // Milk
  tl.to(
    latteMilk,
    {
      attr: {
        y: 175,
      },
      duration: 1,
      ease: 'power2.out',
    },
    '<0.1',
  );

  // Finish pouring
  tl.to(latteStream, {
    autoAlpha: 0,
    scaleY: 0,
    duration: 0.3,
    ease: 'power2.in',
  });

  // Foam
  tl.to(
    latteFoam,
    {
      autoAlpha: 1,
      scale: 1,
      duration: 0.45,
      ease: 'power2.out',
    },
    '<',
  );

  // Latte art
  tl.fromTo(
    latteArt,
    {
      autoAlpha: 0,
      scale: 0.6,
      transformOrigin: 'center center',
    },
    {
      autoAlpha: 1,
      scale: 1,
      duration: 0.7,
      ease: 'back.out(1.5)',
    },
    '<0.15',
  );

  // Text transition (Step 5 -> Step 6)
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
