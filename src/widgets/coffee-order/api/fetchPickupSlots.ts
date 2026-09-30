import { supabase } from '@/shared/api/supabase';
import type { PickupSlot } from '../model/order.types';

export async function fetchPickupSlots(date: string): Promise<PickupSlot[]> {
  const { data, error } = await supabase.rpc('get_available_pickup_slots', {
    p_slot_date: date,
  });

  if (error) {
    console.error('Error fetching pickup slots:', error.message);
    throw new Error('Failed to load pickup slots');
  }

  return data ?? [];
}
