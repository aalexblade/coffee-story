import { gsap } from '@/shared/lib/gsap';
import type { CoffeeVisualHandle } from '../ui/coffee-visual/coffeeScene.types';
import { animateCortadoToFlatWhite } from './timeline/animateCortadoToFlatWhite';
import { animateEspressoToCortado } from './timeline/animateEspressoToCortado';
import { animateHeroToEspresso } from './timeline/animateHeroToEspresso';
import { initTimelineState } from './timeline/initTimelineState';
import {
  HOLD_DURATION,
  STEP_DURATION,
  TEXT_OFFSET,
} from './timeline/timeline.constants';

interface CreateStoryTimelineParams {
  container: HTMLElement;
  visual: CoffeeVisualHandle;
  textCards: HTMLElement[];
}

export function createStoryTimeline({
  container,
  visual,
  textCards,
}: CreateStoryTimelineParams): gsap.core.Timeline | null {
  const {
    hero,
    package: packageEl,
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
    flatWhite,
    flatWhiteCup,
    flatWhiteLiquid,
    flatWhiteMilk,
    flatWhiteCrema,
    flatWhiteStream,
  } = visual;

  if (
    !hero ||
    !packageEl ||
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
    !cortadoStream ||
    !flatWhite ||
    !flatWhiteCup ||
    !flatWhiteLiquid ||
    !flatWhiteMilk ||
    !flatWhiteCrema ||
    !flatWhiteStream
  ) {
    return null;
  }

  // 1. Set initial visual and text states
  initTimelineState(visual, textCards);

  // 2. Create master timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: '+=500%',
      pin: true,
      scrub: 0.8,
      anticipatePin: 1,
    },
  });

  // 3. Step 00 -> Step 01 (Hero -> Espresso)
  animateHeroToEspresso(tl, visual, textCards);

  // 4. Step 01 -> Step 02 (Espresso -> Cortado)
  animateEspressoToCortado(tl, visual, textCards);

  // 5. Step 02 -> Step 03 (Cortado -> Flat White)
  animateCortadoToFlatWhite(tl, visual, textCards);

  // 6. Temporary fallback for remaining text transitions (Step 03 onwards)
  textCards.slice(3).forEach((card, index) => {
    const prevCard = textCards[index + 3];

    if (prevCard) {
      tl.to(
        prevCard,
        {
          autoAlpha: 0,
          y: -TEXT_OFFSET,
          duration: STEP_DURATION,
          ease: 'power2.inOut',
        },
        `+=${HOLD_DURATION}`,
      );
    }

    tl.fromTo(
      card,
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
