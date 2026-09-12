import { gsap } from '@/shared/lib/gsap';

interface TimelineParams {
  container: HTMLElement;
  visual: HTMLElement;
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
  gsap.set(textCards, {
    autoAlpha: 0,
    y: TEXT_OFFSET,
  });

  gsap.set(textCards[0], {
    autoAlpha: 1,
    y: 0,
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

  textCards.forEach((card, index) => {
    if (index === textCards.length - 1) {
      return;
    }

    const nextCard = textCards[index + 1];

    tl.to(
      card,
      {
        autoAlpha: 0,
        y: -TEXT_OFFSET,
        duration: STEP_DURATION,
        ease: 'power2.inOut',
      },
      `+=${HOLD_DURATION}`
    );

    tl.to(
      visual,
      {
        scale: index % 2 === 0 ? 1.06 : 1,
        rotation: index % 2 === 0 ? 3 : -3,
        duration: STEP_DURATION,
        ease: 'power2.inOut',
      },
      '<'
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
      '<'
    );
  });

  return tl;
}