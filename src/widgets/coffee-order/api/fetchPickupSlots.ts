import { supabase } from '@/shared/api/supabase';
import type { PickupSlot } from '../model/order.types';

type GetPickupSlotsRpc = (
  fnName: string,
  args: { p_slot_date: string },
) => Promise<{
  data: PickupSlot[] | null;
  error: { message: string } | null;
}>;

export async function fetchPickupSlots(date: string): Promise<PickupSlot[]> {
  const { data, error } = await (supabase.rpc as unknown as GetPickupSlotsRpc)(
    'get_available_pickup_slots',
    {
      p_slot_date: date,
    },
  );

  if (error) {
    console.error('Error fetching pickup slots:', error.message);
    throw new Error('Failed to load pickup slots');
  }

  return data ?? [];
}
