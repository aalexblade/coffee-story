export interface CoffeeMenuItem {
  id: string;
  number: string;
  tag: string;
  title: string;
  description: string;
  details: string;
  accent: 'espresso' | 'milk' | 'soft';
}

export const COFFEE_MENU_ITEMS: CoffeeMenuItem[] = [
  {
    id: 'espresso',
    number: '01',
    tag: 'INTENSE',
    title: 'Espresso',
    description:
      'Чистий смак обсмаженого зерна, щільна текстура та насичений післясмак.',
    details: '30 ml · 1 shot',
    accent: 'espresso',
  },
  {
    id: 'flat-white',
    number: '02',
    tag: 'BALANCED',
    title: 'Flat White',
    description:
      'Подвійний еспресо та шовковиста мікропіна для виразного кавового характеру.',
    details: '180 ml · double shot',
    accent: 'milk',
  },
  {
    id: 'latte',
    number: '03',
    tag: 'SILKY',
    title: 'Latte',
    description:
      'М’який кавовий смак, тепле молоко та тонкий шар піни з лате-артом.',
    details: '300 ml · double shot',
    accent: 'soft',
  },
];