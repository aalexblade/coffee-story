import { supabase } from '@/shared/api/supabase';
import type { Json } from '@/shared/api/supabase';
import { createOrderError, OrderError } from '../lib/orderErrors';
import type {
  CreateOrderPayload,
  CreateOrderResponse,
} from '../model/order.types';

export async function createOrder(
  payload: CreateOrderPayload,
): Promise<CreateOrderResponse> {
  const { data, error } = await supabase.rpc('create_order', {
    p_pickup_slot_id: payload.pickupSlotId,
    p_items: payload.items as unknown as Json,
    p_customer_name: undefined,
    p_customer_phone: undefined,
  });

  if (error) {
    console.error('Error in createOrder RPC:', error);
    throw createOrderError(error);
  }

  // Оскільки RPC повертає jsonb-об'єкт напряму
  const result = typeof data === 'string' ? JSON.parse(data) : data;

  if (!result || !result.order_id) {
    throw new OrderError(
      'CONFIRMATION_FAILED',
      'No valid order confirmation returned',
    );
  }

  return {
    orderId: result.order_id,
    orderNumber: result.order_number,
    formattedOrderNumber: result.formatted_order_number,
    totalQuantity: result.total_quantity,
    totalPrice: result.total_price,
    items: result.items || [],
  };
}