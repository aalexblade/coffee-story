begin;

create extension if not exists pgtap with schema extensions;
set search_path to public, extensions;

select plan(11);

-- =========================================================
-- 1. RLS STATUS
-- =========================================================

select is(
  (select relrowsecurity from pg_class where relname = 'coffee' and relnamespace = 'public'::regnamespace),
  true,
  'RLS is enabled on coffee'
);

select is(
  (select relrowsecurity from pg_class where relname = 'pickup_slots' and relnamespace = 'public'::regnamespace),
  true,
  'RLS is enabled on pickup_slots'
);

select is(
  (select relrowsecurity from pg_class where relname = 'orders' and relnamespace = 'public'::regnamespace),
  true,
  'RLS is enabled on orders'
);

select is(
  (select relrowsecurity from pg_class where relname = 'order_items' and relnamespace = 'public'::regnamespace),
  true,
  'RLS is enabled on order_items'
);

-- =========================================================
-- 2. DIRECT ACCESS (ROLE: anon)
-- =========================================================

set local role anon;

select lives_ok(
  $$ select id from public.coffee limit 1 $$,
  'anon can SELECT from coffee'
);

select throws_ok(
  $$ select id from public.pickup_slots limit 1 $$,
  '42501',
  NULL,
  'anon CANNOT SELECT from pickup_slots directly'
);

select throws_ok(
  $$ select id from public.orders limit 1 $$,
  '42501',
  NULL,
  'anon CANNOT SELECT from orders'
);

select throws_ok(
  $$ select id from public.order_items limit 1 $$,
  '42501',
  NULL,
  'anon CANNOT SELECT from order_items'
);

select throws_ok(
  $$ insert into public.orders (pickup_slot_id) values ('00000000-0000-0000-0000-000000000000') $$,
  '42501',
  NULL,
  'anon CANNOT INSERT into orders directly'
);

-- =========================================================
-- 3. RPC PERMISSIONS (ROLE: anon)
-- =========================================================

select lives_ok(
  $$ select * from public.get_available_pickup_slots(current_date) $$,
  'anon CAN execute get_available_pickup_slots RPC'
);

select throws_ok(
  $$ select * from public.create_order('00000000-0000-0000-0000-000000000000', '[]'::jsonb) $$,
  'Order must contain at least one item',
  'anon CAN execute create_order RPC'
);

reset role;

select * from finish();

rollback;
