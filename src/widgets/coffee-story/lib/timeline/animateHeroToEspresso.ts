import { gsap } from '@/shared/lib/gsap';
import type { CoffeeVisualHandle } from '../../ui/coffee-visual/coffeeScene.types';
import { HOLD_DURATION, STEP_DURATION, TEXT_OFFSET } from './timeline.constants';

export function animateHeroToEspresso(
  tl: gsap.core.Timeline,
  visual: CoffeeVisualHandle,
  textCards: HTMLElement[],
): void {
  const {
    package: coffeePackage,
    beans,
    espressoCup,
    espressoStream,
    espressoLiquid,
    espressoCrema,
  } = visual;

  tl.to(
    coffeePackage,
    {
      y: -140,
      scale: 0.88,
      rotation: -4,
      autoAlpha: 0,
      duration: STEP_DURATION,
      ease: 'power2.inOut',
    },
    `+=${HOLD_DURATION}`,
  );

  tl.to(
    beans,
    {
      y: 130,
      scale: 0.7,
      rotation: 18,
      autoAlpha: 0,
      duration: STEP_DURATION,
      ease: 'power2.inOut',
    },
    '<',
  );

  tl.to(
    espressoCup,
    {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: STEP_DURATION,
      ease: 'power3.out',
    },
    '<0.2',
  );

  tl.to(espressoStream, {
    autoAlpha: 1,
    scaleY: 1,
    duration: 0.35,
    ease: 'power2.out',
  });

  tl.to(
    espressoLiquid,
    {
      attr: {
        y: 220,
      },
      duration: 0.8,
      ease: 'power2.out',
    },
    '<',
  );

  tl.to(espressoStream, {
    autoAlpha: 0,
    scaleY: 0,
    duration: 0.3,
    ease: 'power2.in',
  });

  tl.to(espressoCrema, {
    autoAlpha: 1,
    scaleX: 1,
    duration: 0.45,
    ease: 'power2.out',
  });

  // Text transition: Step 0 -> Step 1
  if (textCards[0]) {
    tl.to(
      textCards[0],
      {
        autoAlpha: 0,
        y: -TEXT_OFFSET,
        duration: STEP_DURATION,
        ease: 'power2.inOut',
      },
      '<',
    );
  }

  if (textCards[1]) {
    tl.fromTo(
      textCards[1],
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