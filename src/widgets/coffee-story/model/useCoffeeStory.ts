import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { createStoryTimeline } from '../lib/createStoryTimeline';

export function useCoffeeStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<HTMLDivElement[]>([]);

  const registerTextRef = (el: HTMLDivElement | null, index: number) => {
    if (el) textRefs.current[index] = el;
  };

  useGSAP(
    () => {
      if (!containerRef.current || !visualRef.current || textRefs.current.length === 0) {
        return;
      }

      createStoryTimeline({
        container: containerRef.current,
        visual: visualRef.current,
        textCards: textRefs.current,
      });
    },
    { scope: containerRef }
  );

  return {
    containerRef,
    visualRef,
    registerTextRef,
  };
}