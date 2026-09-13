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

export function StoryStage({ visualRef, registerTextRef }: StoryStageProps) {
  return (
    <Container className={styles.stageContainer}>
      <div className={styles.stageGrid}>
        {/* Left column for even steps (Hero, Cortado, Cappuccino) */}
        <div className={styles.leftTextZone}>
          {STORY_STEPS.map((step, index) => {
            if (index % 2 !== 0) return null;
            return (
              <StoryText
                key={step.id}
                step={step}
                refCb={(element) => registerTextRef(element, index)}
              />
            );
          })}
        </div>

        {/* Center column for visual scene */}
        <div className={styles.visualZone}>
          <CoffeeVisual ref={visualRef} />
        </div>

        {/* Right column for odd steps (Espresso, Flat White, Latte) */}
        <div className={styles.rightTextZone}>
          {STORY_STEPS.map((step, index) => {
            if (index % 2 === 0) return null;
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
