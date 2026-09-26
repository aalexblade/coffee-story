import { supabase } from '@/shared/api/supabase';
import type { PickupSlot } from '../model/order.types';

export async function fetchPickupSlots(date: string): Promise<PickupSlot[]> {
  const { data, error } = await supabase
    .from('pickup_slots')
    .select('*')
    .eq('slot_date', date)
    .eq('is_available', true)
    .order('slot_time', { ascending: true });

  if (error) {
    console.error('Error fetching pickup slots:', error.message);
    throw new Error('Failed to load pickup slots');
  }

  return data ?? [];
}
