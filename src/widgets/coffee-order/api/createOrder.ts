import { supabase } from '@/shared/api/supabase';
import type { Json } from '@/shared/api/supabase/database.types';
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
    p_customer_name: payload.customerName,
    p_customer_phone: payload.customerPhone,
  });

  if (error) {
    console.error('Error executing create_order RPC:', error.message);
    throw new Error(error.message || 'Failed to place order');
  }

  if (!data || data.length === 0) {
    throw new Error('No order confirmation returned');
  }

  const result = data[0];

  return {
    orderId: result.order_id,
    orderNumber: result.order_number,
    formattedOrderNumber: `CO-${String(result.order_number).padStart(6, '0')}`,
    totalQuantity: result.total_quantity,
    totalPrice: result.total_price,
  };
}
