import type { Tables } from '@/shared/api/supabase';

export type Coffee = Tables<'coffee'>;
export type CoffeeAccent = Coffee['accent'];

export interface CoffeeOrderItem {
  coffee: Coffee;
  quantity: number;
}
