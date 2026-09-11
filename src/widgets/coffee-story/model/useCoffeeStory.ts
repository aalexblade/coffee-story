import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { createStoryTimeline } from '../lib/createStoryTimeline';

export function useCoffeeStory() {
  const containerRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<HTMLDivElement[]>([]);

  const registerTextRef = (element: HTMLDivElement | null, index: number) => {
    if (element) {
      textRefs.current[index] = element;
    }
  };

  useGSAP(
    () => {
      const container = containerRef.current;
      const visual = visualRef.current;
      const textCards = textRefs.current.filter(Boolean);

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
