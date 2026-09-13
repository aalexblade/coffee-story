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

  /*
   * Initial text state
   */
  gsap.set(textCards, {
    autoAlpha: 0,
    y: TEXT_OFFSET,
  });

  gsap.set(textCards[0], {
    autoAlpha: 1,
    y: 0,
  });

  /*
   * Initial visual state: HERO & ESPRESSO
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
    autoAlpha: 1,
  });

  gsap.set(espressoCup, {
    autoAlpha: 0,
    y: 50,
    scale: 0.88,
    transformOrigin: 'center center',
  });

  gsap.set(espressoLiquid, {
    attr: {
      y: 360,
    },
  });

  gsap.set(espressoCrema, {
    autoAlpha: 0,
    scaleX: 0.8,
    transformOrigin: 'center center',
  });

  gsap.set(espressoStream, {
    autoAlpha: 0,
    scaleY: 0,
    transformOrigin: 'top center',
  });

  /*
   * Initial visual state: CORTADO
   */
  gsap.set(cortado, {
    autoAlpha: 1,
  });

  gsap.set(cortadoGlass, {
    autoAlpha: 0,
    scale: 0.92,
    y: 30,
    transformOrigin: 'center center',
  });

  gsap.set([cortadoLiquid, cortadoMilk], {
    attr: {
      y: 350,
    },
  });

  gsap.set(cortadoStream, {
    autoAlpha: 0,
    scaleY: 0,
    transformOrigin: 'top center',
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
   * STEP 00 → STEP 01
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

  // Text: Hero (0) -> Espresso (1)
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
   * STEP 01 → STEP 02
   * ESPRESSO → CORTADO
   */
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

  tl.to(cortadoStream, {
    autoAlpha: 1,
    scaleY: 1,
    duration: 0.35,
    ease: 'power2.out',
  });

  // Кавова основа з'являється і заливається молоком
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

  tl.to(cortadoMilk, {
    attr: {
      y: 222,
    },
    duration: 0.8,
    ease: 'power2.out',
  });

  tl.to(cortadoStream, {
    autoAlpha: 0,
    scaleY: 0,
    duration: 0.3,
    ease: 'power2.in',
  });

  // Text: Espresso (1) -> Cortado (2)
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

  /*
   * Remaining text transitions (if any beyond step 2)
   */
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
