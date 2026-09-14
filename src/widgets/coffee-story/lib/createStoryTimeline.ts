import { gsap } from '@/shared/lib/gsap';
import type { CoffeeVisualHandle } from '../ui/coffee-visual/coffeeScene.types';
import { animateCappuccinoToLatte } from './timeline/animateCappuccinoToLatte';
import { animateCortadoToFlatWhite } from './timeline/animateCortadoToFlatWhite';
import { animateEspressoToCortado } from './timeline/animateEspressoToCortado';
import { animateFlatWhiteToCappuccino } from './timeline/animateFlatWhiteToCappuccino';
import { animateHeroToEspresso } from './timeline/animateHeroToEspresso';
import { initTimelineState } from './timeline/initTimelineState';

interface CreateStoryTimelineParams {
  container: HTMLElement;
  visual: CoffeeVisualHandle;
  textCards: HTMLElement[];
}

export function createStoryTimeline({
  container,
  visual,
  textCards,
}: CreateStoryTimelineParams): gsap.core.Timeline {
  initTimelineState({ visual, textCards });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: `+=${textCards.length * 100}%`,
      scrub: 0.8,
      pin: true,
      anticipatePin: 1,
    },
  });

  animateHeroToEspresso(tl, visual, textCards);
  animateEspressoToCortado(tl, visual, textCards);
  animateCortadoToFlatWhite(tl, visual, textCards);
  animateFlatWhiteToCappuccino(tl, visual, textCards);
  animateCappuccinoToLatte(tl, visual, textCards);

  return tl;
}
