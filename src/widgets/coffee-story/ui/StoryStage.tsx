import { Container } from '@/shared/ui';
import { STORY_STEPS } from '../model/storySteps';
import type { StoryStep } from '../model/story.types';
import type { CoffeeVisualHandle } from './coffee-visual/coffeeScene.types';
import styles from './CoffeeStory.module.css';
import { CoffeeVisual } from './CoffeeVisual';
import { StoryText } from './StoryText';

interface StoryStageProps {
  visualRef: React.RefObject<CoffeeVisualHandle | null>;

  registerTextRef: (element: HTMLDivElement | null, index: number) => void;
}

export function StoryStage({ visualRef, registerTextRef }: StoryStageProps) {
  const leftSteps = STORY_STEPS.filter((step) => step.side === 'left');

  const rightSteps = STORY_STEPS.filter((step) => step.side === 'right');

  const getOriginalIndex = (step: StoryStep) =>
    STORY_STEPS.findIndex((storyStep) => storyStep.id === step.id);

  return (
    <Container className={styles.stageContainer}>
      <div className={styles.stageGrid}>
        <div className={styles.textZone}>
          {leftSteps.map((step) => {
            const index = getOriginalIndex(step);

            return (
              <StoryText
                key={step.id}
                step={step}
                refCb={(element) => registerTextRef(element, index)}
              />
            );
          })}
        </div>

        <div className={styles.visualZone}>
          <CoffeeVisual ref={visualRef} />
        </div>

        <div className={styles.textZone}>
          {rightSteps.map((step) => {
            const index = getOriginalIndex(step);

            return (
              <StoryText
                key={step.id}
                step={step}
                refCb={(element) => registerTextRef(element, index)}
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
}
