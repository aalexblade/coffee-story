import type { Tables } from '@/shared/api/supabase';
import type { Coffee } from '@/entities/coffee';

export type PickupSlot = Tables<'pickup_slots'>;

export type CoffeeOrderLine = Pick<
  Coffee,
  'id' | 'title' | 'details' | 'price'
> & {
  quantity: number;
};

export type CoffeeOrder = {
  id: string;
  orderNumber?: number;
  formattedOrderNumber?: string;
  pickupTime: string;
  items: CoffeeOrderLine[];
  totalQuantity: number;
  totalPrice: number;
  createdAt: string;
};

export interface CreateOrderItemPayload {
  coffee_id: string;
  quantity: number;
}

export interface CreateOrderPayload {
  pickupSlotId: string;
  items: CreateOrderItemPayload[];
  customerName?: string;
  customerPhone?: string;
}

export interface CreateOrderResponse {
  orderId: string;
  orderNumber: number;
  formattedOrderNumber: string;
  totalQuantity: number;
  totalPrice: number;
}
