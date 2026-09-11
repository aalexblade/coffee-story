'use client';

import { useCoffeeStory } from '../model/useCoffeeStory';
import styles from './CoffeeStory.module.css';
import { StoryStage } from './StoryStage';

export function CoffeeStory() {
  const { containerRef, visualRef, registerTextRef } = useCoffeeStory();

  return (
    <section ref={containerRef} className={styles.section}>
      <StoryStage visualRef={visualRef} registerTextRef={registerTextRef} />
    </section>
  );
}