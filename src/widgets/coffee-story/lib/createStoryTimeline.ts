import { gsap } from '@/shared/lib/gsap';
import type { CoffeeVisualHandle } from '../ui/coffee-visual/coffeeScene.types';
import { animateEspressoToCortado } from './timeline/animateEspressoToCortado';
import { animateHeroToEspresso } from './timeline/animateHeroToEspresso';
import { initTimelineState } from './timeline/initTimelineState';
import {
  HOLD_DURATION,
  STEP_DURATION,
  TEXT_OFFSET,
} from './timeline/timeline.constants';

interface TimelineParams {
  container: HTMLElement;
  visual: CoffeeVisualHandle;
  textCards: HTMLElement[];
}

export function createStoryTimeline({
  container,
  visual,
  textCards,
}: TimelineParams): gsap.core.Timeline {
  const {
    root,
    hero,
    package: coffeePackage,
    beans,
    espresso,
    espressoCup,
    espressoLiquid,
    espressoCrema,
    espressoStream,
    cortado,
    cortadoGlass,
    cortadoLiquid,
    cortadoMilk,
    cortadoStream,
  } = visual;

  if (
    !root ||
    !hero ||
    !coffeePackage ||
    !beans ||
    !espresso ||
    !espressoCup ||
    !espressoLiquid ||
    !espressoCrema ||
    !espressoStream ||
    !cortado ||
    !cortadoGlass ||
    !cortadoLiquid ||
    !cortadoMilk ||
    !cortadoStream
  ) {
    return gsap.timeline();
  }

  // 1. Initialize states
  initTimelineState(visual, textCards);

  // 2. Create ScrollTrigger timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: `+=${textCards.length * 100}%`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  // 3. Step 00 -> Step 01 (Hero -> Espresso)
  animateHeroToEspresso(tl, visual, textCards);

  // 4. Step 01 -> Step 02 (Espresso -> Cortado)
  animateEspressoToCortado(tl, visual, textCards);

  // 5. Remaining text transitions (if any cards exist past Step 2)
  textCards.slice(2).forEach((card, index) => {
    const currentIndex = index + 2;
    const nextCard = textCards[currentIndex + 1];

    if (!nextCard) {
      return;
    }

    tl.to(
      card,
      {
        autoAlpha: 0,
        y: -TEXT_OFFSET,
        duration: STEP_DURATION,
        ease: 'power2.inOut',
      },
      `+=${HOLD_DURATION}`,
    );

    tl.fromTo(
      nextCard,
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
  });

  return tl;
}
