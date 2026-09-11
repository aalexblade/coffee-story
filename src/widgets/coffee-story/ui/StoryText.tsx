import { StoryStep } from '../model/story.types';
import styles from './CoffeeStory.module.css';

interface StoryTextProps {
  step: StoryStep;
  refCb: (el: HTMLDivElement | null) => void;
}

export function StoryText({ step, refCb }: StoryTextProps) {
  return (
    <div ref={refCb} className={styles.textCard}>
      <span className={styles.tag}>{step.tag}</span>
      <h3 className={styles.title}>{step.title}</h3>
      <p className={styles.description}>{step.description}</p>
    </div>
  );
}