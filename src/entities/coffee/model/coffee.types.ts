export type CoffeeAccent = 'espresso' | 'milk' | 'soft';

export interface Coffee {
  id: string;
  number: string;
  tag: string;
  title: string;
  description: string;
  details: string;
  price: number;
  accent: CoffeeAccent;
}
