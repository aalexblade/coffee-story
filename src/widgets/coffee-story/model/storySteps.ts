import type { StoryStep } from './story.types';

export const STORY_STEPS: StoryStep[] = [
  {
    id: 'hero',
    tag: 'ORIGIN',
    title: 'Beans & Roast',
    description:
      'Все починається з відібраних зерен свіжого обсмажування. Саме вони задають основу смаку та аромату напою.',
    side: 'left',
  },
  {
    id: 'espresso',
    tag: 'BASE',
    title: 'Espresso',
    description:
      'Концентрований, насичений екстракт кави під високим тиском. Фундамент для більшості класичних напоїв.',
    side: 'right',
  },
  {
    id: 'cortado',
    tag: '1:1 RATIO',
    title: 'Cortado',
    description:
      'Рівний баланс міцного еспресо та теплого збитого молока у співвідношенні 1:1, що пом’якшує гіркоту.',
    side: 'left',
  },
  {
    id: 'flat-white',
    tag: 'MICROFOAM',
    title: 'Flat White',
    description:
      'Подвійна порція еспресо з тонким шаром шовковистої мікропіни для вираженого кавового смаку.',
    side: 'right',
  },
  {
    id: 'cappuccino',
    tag: 'CLASSIC',
    title: 'Cappuccino',
    description:
      'Класичне поєднання еспресо, збитого молока та пишної молочної піни з оксамитовою текстурою.',
    side: 'left',
  },
  {
    id: 'latte',
    tag: 'SILKY & MILD',
    title: 'Latte',
    description:
      'Ніжний молочний напій у високому скляному стакані з м’яким кавовим смаком та витонченим лате-артом.',
    side: 'right',
  },
];
