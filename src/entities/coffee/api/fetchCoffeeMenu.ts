import { supabase } from '@/shared/api/supabase';
import type { Coffee } from '../model/coffee.types';

export async function fetchCoffeeMenu(): Promise<Coffee[]> {
  const { data, error } = await supabase
    .from('coffee')
    .select('*')
    .eq('is_available', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching coffee menu:', error.message);
    throw new Error('Failed to load coffee menu');
  }

  return (data as Coffee[]) ?? [];
}
