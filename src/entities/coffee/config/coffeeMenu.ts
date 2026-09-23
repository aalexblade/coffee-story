import type { CoffeeItem } from '../model/coffee.types';

export const COFFEE_MENU: CoffeeItem[] = [
  {
    id: 'espresso',
    title: 'Espresso',
    description: '30 ml · 1 shot',
    price: 70,
    volume: '30 ml',
    espressoShots: 1,
  },
  {
    id: 'flat-white',
    title: 'Flat White',
    description: '180 ml · double shot',
    price: 110,
    volume: '180 ml',
    espressoShots: 2,
  },
  {
    id: 'latte',
    title: 'Latte',
    description: '300 ml · double shot',
    price: 120,
    volume: '300 ml',
    espressoShots: 2,
  },
];