export type CoffeeOrderItem = {
  id: string;
  title: string;
  description: string;
  price: number;
};

export type CoffeeOrderLine = CoffeeOrderItem & {
  quantity: number;
};
