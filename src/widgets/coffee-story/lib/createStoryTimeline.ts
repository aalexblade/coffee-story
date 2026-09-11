import { gsap } from '@/shared/lib/gsap';

interface TimelineParams {
  container: HTMLElement;
  visual: HTMLElement;
  textCards: HTMLElement[];
}

export function createStoryTimeline({
  container,
  visual,
  textCards,
}: TimelineParams): gsap.core.Timeline {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: '+=300%',
      pin: true,
      scrub: 1,
      anticipatePin: 1,
    },
  });

  // Початкові стани для карток (крім першої)
  textCards.forEach((card, index) => {
    if (index !== 0) {
      gsap.set(card, { opacity: 0, y: 30 });
    }
  });

  // Крок 1 -> Крок 2
  tl.to(textCards[0], { opacity: 0, y: -30, duration: 1 })
    .to(visual, { scale: 1.15, rotation: 10, duration: 1 }, '<')
    .to(textCards[1], { opacity: 1, y: 0, duration: 1 }, '-=0.5')

    // Крок 2 -> Крок 3
    .to(textCards[1], { opacity: 0, y: -30, duration: 1 }, '+=1')
    .to(
      visual,
      { scale: 1, rotation: 0, borderRadius: '50%', duration: 1 },
      '<'
    )
    .to(textCards[2], { opacity: 1, y: 0, duration: 1 }, '-=0.5');

  return tl;
}