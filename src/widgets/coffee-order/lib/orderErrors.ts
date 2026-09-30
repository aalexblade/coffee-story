export type OrderErrorCode =
  | 'EMPTY_ORDER'
  | 'SLOT_UNAVAILABLE'
  | 'SLOT_FULL'
  | 'INVALID_NAME'
  | 'INVALID_PHONE'
  | 'COFFEE_UNAVAILABLE'
  | 'INVALID_COFFEE_ID'
  | 'DUPLICATE_COFFEE'
  | 'INVALID_QUANTITY'
  | 'CONFIRMATION_FAILED'
  | 'UNKNOWN';

export class OrderError extends Error {
  constructor(
    public readonly code: OrderErrorCode,
    message: string,
  ) {
    super(message);
    this.name = 'OrderError';
  }
}

function getErrorCode(message: string): OrderErrorCode {
  const normalizedMessage = message.toLowerCase();

  if (normalizedMessage.includes('order must contain at least one item')) {
    return 'EMPTY_ORDER';
  }

  if (normalizedMessage.includes('pickup slot is unavailable')) {
    return 'SLOT_UNAVAILABLE';
  }

  if (normalizedMessage.includes('pickup slot is fully booked')) {
    return 'SLOT_FULL';
  }

  if (normalizedMessage.includes('invalid customer name')) {
    return 'INVALID_NAME';
  }

  if (normalizedMessage.includes('invalid customer phone')) {
    return 'INVALID_PHONE';
  }

  if (normalizedMessage.includes('coffee_id is required')) {
    return 'INVALID_COFFEE_ID';
  }

  if (normalizedMessage.includes('duplicate coffee_id')) {
    return 'DUPLICATE_COFFEE';
  }

  if (normalizedMessage.includes('must be between 1 and 20')) {
    return 'INVALID_QUANTITY';
  }

  if (
    normalizedMessage.includes('coffee "') &&
    normalizedMessage.includes('is unavailable')
  ) {
    return 'COFFEE_UNAVAILABLE';
  }

  return 'UNKNOWN';
}

export function createOrderError(error: unknown): OrderError {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === 'object' && error !== null && 'message' in error
        ? String((error as { message: unknown }).message)
        : 'Failed to create order';

  const code = getErrorCode(message);

  return new OrderError(code, message);
}

export function getOrderErrorMessage(code: OrderErrorCode): string {
  switch (code) {
    case 'EMPTY_ORDER':
      return 'Додайте хоча б один напій до замовлення.';

    case 'SLOT_UNAVAILABLE':
      return 'Цей час більше недоступний. Оберіть інший час.';

    case 'SLOT_FULL':
      return 'На цей час уже немає вільних місць. Оберіть інший час.';

    case 'INVALID_NAME':
      return 'Перевірте імʼя. Воно має містити від 2 до 100 символів.';

    case 'INVALID_PHONE':
      return 'Перевірте номер телефону.';

    case 'COFFEE_UNAVAILABLE':
      return 'Один із вибраних напоїв більше недоступний. Оновіть меню.';

    case 'INVALID_COFFEE_ID':
    case 'DUPLICATE_COFFEE':
    case 'INVALID_QUANTITY':
      return 'Не вдалося перевірити склад замовлення. Оновіть сторінку та спробуйте ще раз.';

    case 'UNKNOWN':
    default:
      return 'Не вдалося оформити замовлення. Спробуйте ще раз.';
  }
}
