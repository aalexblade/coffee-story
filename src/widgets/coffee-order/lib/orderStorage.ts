import type { CoffeeOrder } from '../model/order.types';

export const ORDER_STORAGE_KEY = 'coffee-story:last-order';

function isCoffeeOrder(value: unknown): value is CoffeeOrder {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const order = value as Partial<CoffeeOrder>;

  return (
    typeof order.id === 'string' &&
    order.id.length > 0 &&
    typeof order.orderNumber === 'number' &&
    Number.isFinite(order.orderNumber) &&
    typeof order.formattedOrderNumber === 'string' &&
    order.formattedOrderNumber.length > 0 &&
    typeof order.pickupTime === 'string' &&
    Array.isArray(order.items) &&
    typeof order.totalQuantity === 'number' &&
    Number.isFinite(order.totalQuantity) &&
    typeof order.totalPrice === 'number' &&
    Number.isFinite(order.totalPrice)
  );
}

export function getStoredOrder(): CoffeeOrder | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const storedOrder = sessionStorage.getItem(ORDER_STORAGE_KEY);

    if (!storedOrder) {
      return null;
    }

    const parsedOrder: unknown = JSON.parse(storedOrder);

    if (!isCoffeeOrder(parsedOrder)) {
      sessionStorage.removeItem(ORDER_STORAGE_KEY);
      return null;
    }

    return parsedOrder;
  } catch (error) {
    console.error('Failed to restore stored order:', error);
    sessionStorage.removeItem(ORDER_STORAGE_KEY);

    return null;
  }
}

export function saveOrder(order: CoffeeOrder): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    sessionStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
  } catch (error) {
    console.error('Failed to save order:', error);
  }
}

export function clearStoredOrder(): void {
  if (typeof window === 'undefined') {
    return;
  }

  sessionStorage.removeItem(ORDER_STORAGE_KEY);
}
