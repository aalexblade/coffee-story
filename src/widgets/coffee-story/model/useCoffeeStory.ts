import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { createStoryTimeline } from '../lib/createStoryTimeline';
import type { CoffeeVisualHandle } from '../ui/coffee-visual/coffeeScene.types';

export function useCoffeeStory() {
  const containerRef = useRef<HTMLElement>(null);
  const visualRef = useRef<CoffeeVisualHandle>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  const registerTextRef = (element: HTMLDivElement | null, index: number) => {
    textRefs.current[index] = element;
  };

  useGSAP(
    () => {
      const container = containerRef.current;
      const visual = visualRef.current;

      const textCards = textRefs.current.filter(
        (card): card is HTMLDivElement => card !== null,
      );

      if (!container || !visual || textCards.length === 0) {
        return;
      }

      createStoryTimeline({
        container,
        visual,
        textCards,
      });
    },
    {
      scope: containerRef,
    },
  );

  return {
    containerRef,
    visualRef,
    registerTextRef,
  };
}
