import type { Coffee } from '@/entities/coffee';

export type CoffeeOrderLine = Pick<
  Coffee,
  'id' | 'title' | 'details' | 'price'
> & {
  quantity: number;
};

export type CoffeeOrder = {
  id: string;
  pickupTime: string;
  items: CoffeeOrderLine[];
  totalQuantity: number;
  totalPrice: number;
  createdAt: string;
};
