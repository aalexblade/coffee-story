import type { StoryStep } from '../model/story.types';
import styles from './CoffeeStory.module.css';

interface StoryTextProps {
  step: StoryStep;
  refCb: (el: HTMLDivElement | null) => void;
}

export function StoryText({ step, refCb }: StoryTextProps) {
  return (
    <article
      ref={refCb}
      className={styles.textCard}
      data-side={step.side}
      data-step={step.id}
    >
      <span className={styles.tag}>{step.tag}</span>
      <h2 className={styles.title}>{step.title}</h2>
      <p className={styles.description}>{step.description}</p>
    </article>
  );
}
