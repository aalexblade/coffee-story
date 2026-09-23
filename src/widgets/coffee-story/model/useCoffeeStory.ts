'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
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

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      // Fallback для користувачів із prefers-reduced-motion
      if (prefersReducedMotion) {
        // 1. Показуємо всі текстові картки доступними для читання
        textCards.forEach((card) => {
          gsap.set(card, {
            autoAlpha: 1,
            y: 0,
            clearProps: 'transform',
          });
        });

        // 2. Показуємо фінальну візуальну сцену
        gsap.set(
          [
            visual.hero,
            visual.espresso,
            visual.cortado,
            visual.flatWhite,
            visual.cappuccino,
          ],
          { autoAlpha: 0 },
        );

        gsap.set(visual.latteGlass, { autoAlpha: 1, scale: 1, y: 0 });
        gsap.set([visual.latteCoffee, visual.latteMilk], { scaleY: 1 });
        gsap.set([visual.latteFoam, visual.latteArt], {
          autoAlpha: 1,
          scale: 1,
        });

        return;
      }

      // Запуск звичайного інтерактивного таймлайну
      const timeline = createStoryTimeline({
        container,
        visual,
        textCards,
      });

      return () => {
        timeline.kill();
      };
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