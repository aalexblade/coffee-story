import { ORDER_TIME_ZONE } from '../config/order.config';
import type { PickupSlot } from '../model/order.types';

function getTimeZoneDateParts(date: Date) {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: ORDER_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const parts = formatter.formatToParts(date);

  const values = Object.fromEntries(
    parts
      .filter((part) => part.type !== 'literal')
      .map((part) => [part.type, part.value]),
  );

  return {
    year: values.year,
    month: values.month,
    day: values.day,
  };
}

export function getTodayDate(): string {
  const { year, month, day } = getTimeZoneDateParts(new Date());

  return `${year}-${month}-${day}`;
}

export function isPickupSlotInFuture(
  slot: PickupSlot,
  now = new Date(),
): boolean {
  const { year, month, day } = getTimeZoneDateParts(now);

  const today = `${year}-${month}-${day}`;

  if (slot.slot_date > today) {
    return true;
  }

  if (slot.slot_date < today) {
    return false;
  }

  const currentTime = new Intl.DateTimeFormat('en-GB', {
    timeZone: ORDER_TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(now);

  return slot.slot_time.slice(0, 5) > currentTime;
}