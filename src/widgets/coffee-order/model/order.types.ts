export type CoffeeOrderItem = {
  id: string;
  title: string;
  description: string;
  price: number;
};

export type CoffeeOrderLine = CoffeeOrderItem & {
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
