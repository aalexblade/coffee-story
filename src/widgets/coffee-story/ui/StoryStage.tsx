import { Container } from '@/shared/ui';
import { STORY_STEPS } from '../model/storySteps';
import type { CoffeeVisualHandle } from './coffee-visual/coffeeScene.types';
import styles from './CoffeeStory.module.css';
import { CoffeeVisual } from './CoffeeVisual';
import { StoryText } from './StoryText';

interface StoryStageProps {
  visualRef: React.RefObject<CoffeeVisualHandle | null>;
  registerTextRef: (element: HTMLDivElement | null, index: number) => void;
}

export function StoryStage({
  visualRef,
  registerTextRef,
}: StoryStageProps) {
  return (
    <Container className={styles.stageContainer}>
      <div className={styles.stageGrid}>
        <div className={styles.textZone}>
          {STORY_STEPS.map((step, index) => (
            <StoryText
              key={step.id}
              step={step}
              refCb={(element) => registerTextRef(element, index)}
            />
          ))}
        </div>

        <div className={styles.visualZone}>
          <CoffeeVisual ref={visualRef} />
        </div>
      </div>
    </Container>
  );
}