export type StoryTextSide = 'left' | 'right';

export interface StoryStep {
  id: string;
  tag: string;
  title: string;
  description: string;
  side: StoryTextSide;
}
