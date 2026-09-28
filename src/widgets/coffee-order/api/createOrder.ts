import { supabase } from '@/shared/api/supabase';
import type { Json } from '@/shared/types/database.types';
import type {
  CreateOrderPayload,
  CreatedOrderResponse,
} from '../model/order.types';

export async function createOrder(
  payload: CreateOrderPayload,
): Promise<CreatedOrderResponse> {
  const { data, error } = await supabase.rpc('create_order', {
    p_pickup_slot_id: payload.pickupSlotId,
    p_items: payload.items as Json,
    p_customer_name: payload.customerName ?? null,
    p_customer_phone: payload.customerPhone ?? null,
  });

  if (error) {
    console.error('Error in createOrder RPC:', error);
    throw new Error(error.message || 'Failed to create order');
  }

  const result = data as unknown as {
    order_id: string;
    order_number: number;
    formatted_order_number: string;
    total_quantity: number;
    total_price: number;
  };

  return {
    orderId: result.order_id,
    orderNumber: result.order_number,
    formattedOrderNumber: result.formatted_order_number,
    totalQuantity: result.total_quantity,
    totalPrice: result.total_price,
  };
}
