import { gsap } from '@/shared/lib/gsap';
import type { CoffeeVisualHandle } from '../ui/coffee-visual/coffeeScene.types';

interface TimelineParams {
  container: HTMLElement;
  visual: CoffeeVisualHandle;
  textCards: HTMLElement[];
}

const STEP_DURATION = 1;
const HOLD_DURATION = 1;
const TEXT_OFFSET = 40;

export function createStoryTimeline({
  container,
  visual,
  textCards,
}: TimelineParams): gsap.core.Timeline {
  const { root, hero, package: coffeePackage, beans, espresso } = visual;

  if (!root || !hero || !coffeePackage || !beans || !espresso) {
    return gsap.timeline();
  }

  gsap.set(textCards, {
    autoAlpha: 0,
    y: TEXT_OFFSET,
  });

  gsap.set(textCards[0], {
    autoAlpha: 1,
    y: 0,
  });

  /*
   * Initial visual state
   */

  gsap.set(hero, {
    autoAlpha: 1,
    scale: 1,
    transformOrigin: 'center center',
  });

  gsap.set(coffeePackage, {
    autoAlpha: 1,
    y: 0,
    scale: 1,
    rotation: 0,
    transformOrigin: 'center center',
  });

  gsap.set(beans, {
    autoAlpha: 1,
    y: 0,
    scale: 1,
    rotation: 0,
    transformOrigin: 'center center',
  });

  gsap.set(espresso, {
    autoAlpha: 0,
    y: 40,
    scale: 0.88,
    transformOrigin: 'center center',
  });

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

  /*
   * STEP 0 → STEP 1
   *
   * HERO → ESPRESSO
   */

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
    espresso,
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
   * Hero → Espresso text
   */

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

  /*
   * Remaining text transitions
   *
   * Visual animation will be added
   * step by step with new drinks.
   */

  textCards.slice(1).forEach((card, index) => {
    const currentIndex = index + 1;
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

    tl.to(
      root,
      {
        scale: currentIndex % 2 === 0 ? 1.04 : 1,
        rotation: currentIndex % 2 === 0 ? 1 : -1,
        duration: STEP_DURATION,
        ease: 'power2.inOut',
      },
      '<',
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
