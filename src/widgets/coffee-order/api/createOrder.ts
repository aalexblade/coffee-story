import { supabase } from '@/shared/api/supabase';
import type { Json } from '@/shared/api/supabase';
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
    // Форматуємо помилку від Supabase, щоб уникнути виводу порожнього {} об'єкта
    const errorMessage =
      error.message || error.details || 'Failed to create order';
    console.error('Error in createOrder RPC:', errorMessage, error);
    throw new Error(errorMessage);
  }

  const result = data?.[0];

  if (!result) {
    throw new Error('No order confirmation returned');
  }

  return {
    orderId: result.order_id,
    orderNumber: result.order_number,
    formattedOrderNumber: `CO-${String(result.order_number).padStart(6, '0')}`,
    totalQuantity: result.total_quantity,
    totalPrice: result.total_price,
  };
}
