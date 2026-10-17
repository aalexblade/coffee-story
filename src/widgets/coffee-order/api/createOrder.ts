import { OrderError } from '../lib/orderErrors';
import type {
  CreateOrderPayload,
  CreateOrderResponse,
  OrderItemSnapshot,
} from '../model/order.types';

function validateRpcResponse(data: unknown): CreateOrderResponse {
  let result: unknown;

  try {
    result = typeof data === 'string' ? JSON.parse(data) : data;
  } catch {
    throw new OrderError(
      'CONFIRMATION_FAILED',
      'Failed to parse RPC response JSON payload',
    );
  }

  if (
    !result ||
    typeof result !== 'object' ||
    typeof (result as Record<string, unknown>).order_id !== 'string' ||
    typeof (result as Record<string, unknown>).order_number !== 'number' ||
    typeof (result as Record<string, unknown>).formatted_order_number !==
      'string' ||
    typeof (result as Record<string, unknown>).total_quantity !== 'number' ||
    typeof (result as Record<string, unknown>).total_price !== 'number' ||
    !Array.isArray((result as Record<string, unknown>).items)
  ) {
    throw new OrderError(
      'CONFIRMATION_FAILED',
      'Invalid RPC response payload structure',
    );
  }

  const rawItems = (result as Record<string, unknown>).items as unknown[];

  const items: OrderItemSnapshot[] = rawItems.map((item) => {
    const typedItem = item as Record<string, unknown>;
    return {
      coffee_id: typedItem.coffee_id as string,
      title: typedItem.title as string,
      price: typedItem.price as number,
      quantity: typedItem.quantity as number,
      subtotal: typedItem.subtotal as number,
    };
  });

  const typedResult = result as Record<string, unknown>;

  return {
    orderId: typedResult.order_id as string,
    orderNumber: typedResult.order_number as number,
    formattedOrderNumber: typedResult.formatted_order_number as string,
    totalQuantity: typedResult.total_quantity as number,
    totalPrice: typedResult.total_price as number,
    items,
  };
}

export async function createOrder(
  payload: CreateOrderPayload,
): Promise<CreateOrderResponse> {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      slot_id: payload.pickupSlotId,
      items: payload.items,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new OrderError(
      'CONFIRMATION_FAILED',
      result.error || 'Помилка при створенні замовлення на сервері',
    );
  }

  return validateRpcResponse(result.order);
}
