begin;

create extension if not exists pgtap with schema extensions;

select plan(14);

-- =========================================================
-- TABLES
-- =========================================================

select has_table(
  'public',
  'coffee',
  'coffee table exists'
);

select has_table(
  'public',
  'pickup_slots',
  'pickup_slots table exists'
);

select has_table(
  'public',
  'orders',
  'orders table exists'
);

select has_table(
  'public',
  'order_items',
  'order_items table exists'
);

-- =========================================================
-- IMPORTANT COLUMNS
-- =========================================================

select has_column(
  'public',
  'coffee',
  'price',
  'coffee.price exists'
);

select has_column(
  'public',
  'coffee',
  'is_available',
  'coffee.is_available exists'
);

select has_column(
  'public',
  'pickup_slots',
  'slot_date',
  'pickup_slots.slot_date exists'
);

select has_column(
  'public',
  'pickup_slots',
  'slot_time',
  'pickup_slots.slot_time exists'
);

select has_column(
  'public',
  'orders',
  'order_number',
  'orders.order_number exists'
);

select has_column(
  'public',
  'orders',
  'pickup_slot_id',
  'orders.pickup_slot_id exists'
);

select has_column(
  'public',
  'order_items',
  'coffee_title',
  'order_items.coffee_title exists'
);

select has_column(
  'public',
  'order_items',
  'unit_price',
  'order_items.unit_price exists'
);

-- =========================================================
-- FUNCTIONS
-- =========================================================

select has_function(
  'public',
  'create_order',
  ARRAY[
    'uuid',
    'jsonb',
    'text',
    'text'
  ],
  'create_order RPC exists'
);

select has_function(
  'public',
  'get_available_pickup_slots',
  ARRAY['date'],
  'get_available_pickup_slots RPC exists'
);

select * from finish();

rollback;
