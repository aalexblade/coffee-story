'use client';

import { useCoffeeStory } from '../model/useCoffeeStory';
import styles from './CoffeeStory.module.css';
import { StoryStage } from './StoryStage';

export function CoffeeStory() {
  const { containerRef, visualRef, registerTextRef } = useCoffeeStory();

  return (
    <section
      ref={containerRef}
      className={styles.section}
      aria-labelledby="coffee-story-heading"
    >
      <h2 id="coffee-story-heading" className={styles.srOnly}>
        Coffee Story
      </h2>

      <StoryStage visualRef={visualRef} registerTextRef={registerTextRef} />
    </section>
  );
}
