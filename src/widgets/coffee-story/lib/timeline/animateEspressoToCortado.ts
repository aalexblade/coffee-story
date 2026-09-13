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

  // Espresso → out
  tl.to(
    espressoCup,
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
    espressoCrema,
    {
      autoAlpha: 0,
      duration: 0.5,
      ease: 'power2.inOut',
    },
    '<',
  );

  // Cortado glass → in
  tl.to(
    cortadoGlass,
    {
      autoAlpha: 1,
      scale: 1,
      y: 0,
      duration: STEP_DURATION,
      ease: 'power3.out',
    },
    '<0.25',
  );

  // Milk starts flowing
  tl.to(cortadoStream, {
    autoAlpha: 1,
    scaleY: 1,
    duration: 0.35,
    ease: 'power2.out',
  });

  // Coffee base rises to 50% level
  tl.to(
    cortadoLiquid,
    {
      attr: {
        y: 285,
      },
      duration: 0.6,
      ease: 'power2.out',
    },
    '<',
  );

  // Milk rises above coffee layer to 100% level
  tl.to(cortadoMilk, {
    attr: {
      y: 220,
    },
    duration: 0.8,
    ease: 'power2.out',
  });

  // Stop pouring
  tl.to(cortadoStream, {
    autoAlpha: 0,
    scaleY: 0,
    duration: 0.3,
    ease: 'power2.in',
  });

  // Text: Espresso → Cortado
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
