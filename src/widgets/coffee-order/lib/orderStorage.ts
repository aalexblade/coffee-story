import type { CoffeeOrder } from '../model/order.types';

export const ORDER_STORAGE_KEY = 'coffee-story:last-order';
const CUSTOM_STORAGE_EVENT = 'coffee-order-changed';

// Кеш для збереження стабільного посилання об'єкта для useSyncExternalStore
let cachedOrder: CoffeeOrder | null = null;
let lastRawStorageValue: string | null = null;

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
    const rawValue = sessionStorage.getItem(ORDER_STORAGE_KEY);

    if (rawValue === lastRawStorageValue) {
      return cachedOrder;
    }

    lastRawStorageValue = rawValue;

    if (!rawValue) {
      cachedOrder = null;
      return null;
    }

    const parsedOrder: unknown = JSON.parse(rawValue);

    if (!isCoffeeOrder(parsedOrder)) {
      sessionStorage.removeItem(ORDER_STORAGE_KEY);
      cachedOrder = null;
      lastRawStorageValue = null;
      return null;
    }

    cachedOrder = parsedOrder;
    return cachedOrder;
  } catch (error) {
    console.error('Failed to restore stored order:', error);
    sessionStorage.removeItem(ORDER_STORAGE_KEY);
    cachedOrder = null;
    lastRawStorageValue = null;
    return null;
  }
}

export function saveOrder(order: CoffeeOrder): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const stringified = JSON.stringify(order);
    sessionStorage.setItem(ORDER_STORAGE_KEY, stringified);

    lastRawStorageValue = stringified;
    cachedOrder = order;

    window.dispatchEvent(new Event(CUSTOM_STORAGE_EVENT));
    window.dispatchEvent(new Event('storage'));
  } catch (error) {
    console.error('Failed to save order:', error);
  }
}

export function clearStoredOrder(): void {
  if (typeof window === 'undefined') {
    return;
  }

  sessionStorage.removeItem(ORDER_STORAGE_KEY);
  lastRawStorageValue = null;
  cachedOrder = null;

  window.dispatchEvent(new Event(CUSTOM_STORAGE_EVENT));
  window.dispatchEvent(new Event('storage'));
}

export function subscribeToOrderStore(callback: () => void): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  window.addEventListener(CUSTOM_STORAGE_EVENT, callback);
  window.addEventListener('storage', callback);

  return () => {
    window.removeEventListener(CUSTOM_STORAGE_EVENT, callback);
    window.removeEventListener('storage', callback);
  };
}

export function getOrderServerSnapshot(): CoffeeOrder | null {
  return null;
}
