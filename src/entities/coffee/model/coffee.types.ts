import type { Database } from '@/shared/api/supabase';

export type CoffeeAccent = Database['public']['Enums']['coffee_accent'];

export interface Coffee {
  id: string;
  slug?: string;
  number: string;
  tag: string;
  title: string;
  description: string;
  details: string;
  price: number;
  accent: CoffeeAccent;
  is_available?: boolean;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface CoffeeOrderItem {
  coffee: Coffee;
  quantity: number;
}
