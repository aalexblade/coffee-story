import type { StoryStep } from './story.types';

export const STORY_STEPS: StoryStep[] = [
  {
    id: 'hero',
    tag: '00 / Origin',
    title: 'From Bean to Ritual',
    description:
      'Every great coffee begins with carefully selected beans and the promise of a perfect extraction.',
    side: 'left',
  },
  {
    id: 'espresso',
    tag: '01 / Extraction',
    title: 'Rich Espresso',
    description:
      'A concentrated 30 ml shot with deep flavor, rich body and a dense golden crema.',
    side: 'right',
  },
  {
    id: 'cortado',
    tag: '02 / Balance',
    title: 'Cortado',
    description:
      'Equal parts espresso and warm textured milk create a balanced and smooth cup.',
    side: 'left',
  },
  {
    id: 'flat-white',
    tag: '03 / Intensity',
    title: 'Flat White',
    description:
      'A double espresso combined with silky microfoam for a bold and velvety texture.',
    side: 'right',
  },
  {
    id: 'cappuccino',
    tag: '04 / Texture',
    title: 'Cappuccino',
    description:
      'Espresso, steamed milk and a generous layer of airy foam in perfect harmony.',
    side: 'left',
  },
  {
    id: 'latte',
    tag: '05 / Finish',
    title: 'Latte',
    description:
      'A softer, milk-forward coffee finished with delicate latte art.',
    side: 'right',
  },
];