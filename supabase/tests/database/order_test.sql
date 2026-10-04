begin;

create extension if not exists pgtap with schema extensions;
set search_path to public, extensions;

select plan(21);

-- SETUP TEST DATA
insert into public.coffee (id, title, description, details, price, tag, number, sort_order, accent, is_available, slug)
values
  ('test-espresso', 'Test Espresso', 'Desc', 'Details', 50.00, 'tag', '991', 991, 'espresso', true, 'test-espresso'),
  ('test-decaf', 'Test Decaf', 'Desc', 'Details', 60.00, 'tag', '992', 992, 'soft', false, 'test-decaf')
on conflict (id) do update set 
  is_available = excluded.is_available, 
  price = excluded.price,
  number = excluded.number;

insert into public.pickup_slots (id, slot_date, slot_time, max_orders, is_available)
values
  ('11111111-1111-1111-1111-111111111111', current_date, '23:58:00', 5, true),
  ('22222222-2222-2222-2222-222222222222', current_date, '23:59:00', 1, true)
on conflict (id) do update set max_orders = excluded.max_orders;

insert into public.orders (id, pickup_slot_id, total_quantity, total_price, customer_name, customer_phone, status)
values (
  '33333333-3333-3333-3333-333333333333',
  '22222222-2222-2222-2222-222222222222',
  1,
  50.00,
  'Pre-existing Order',
  '+380000000000',
  'pending'
) on conflict (id) do nothing;

-- EXECUTE TESTS AS ANON
set local role anon;

select lives_ok(
  $$ select * from public.create_order('11111111-1111-1111-1111-111111111111', '[{"coffee_id": "test-espresso", "quantity": 2}]'::jsonb, 'Олександр', '+380991234567') $$,
  'Valid order creation succeeds'
);

select throws_ok(
  $$ select * from public.create_order('11111111-1111-1111-1111-111111111111', '[]'::jsonb) $$,
  'Empty items payload rejected'
);

select throws_ok(
  $$ select * from public.create_order('11111111-1111-1111-1111-111111111111', '[{"coffee_id": "non-existent", "quantity": 1}]'::jsonb) $$,
  'Non-existent coffee rejected'
);

select throws_ok(
  $$ select * from public.create_order('11111111-1111-1111-1111-111111111111', '[{"coffee_id": "test-decaf", "quantity": 1}]'::jsonb) $$,
  'Unavailable coffee rejected'
);

select throws_ok(
  $$ select * from public.create_order('11111111-1111-1111-1111-111111111111', '[{"coffee_id": "test-espresso", "quantity": 1}, {"coffee_id": "test-espresso", "quantity": 2}]'::jsonb) $$,
  'Duplicate coffee in payload rejected'
);

select throws_ok(
  $$ select * from public.create_order('11111111-1111-1111-1111-111111111111', '[{"coffee_id": "test-espresso", "quantity": 0}]'::jsonb) $$,
  'Quantity 0 rejected'
);

select throws_ok(
  $$ select * from public.create_order('11111111-1111-1111-1111-111111111111', '[{"coffee_id": "test-espresso", "quantity": 21}]'::jsonb) $$,
  'Quantity 21 rejected'
);

select throws_ok(
  $$ select * from public.create_order('11111111-1111-1111-1111-111111111111', '[{"coffee_id": "test-espresso", "quantity": 1.5}]'::jsonb) $$,
  'Decimal quantity rejected'
);

select throws_ok(
  $$ select * from public.create_order('11111111-1111-1111-1111-111111111111', '[{"coffee_id": "test-espresso", "quantity": "abc"}]'::jsonb) $$,
  'String quantity rejected'
);

select throws_ok(
  $$ select * from public.create_order('11111111-1111-1111-1111-111111111111', '[{"coffee_id": "test-espresso", "quantity": null}]'::jsonb) $$,
  'Null quantity rejected'
);

select throws_ok(
  $$ select * from public.create_order('11111111-1111-1111-1111-111111111111', '[{"coffee_id": "test-espresso", "quantity": true}]'::jsonb) $$,
  'Boolean quantity rejected'
);

select throws_ok(
  $$ select * from public.create_order('11111111-1111-1111-1111-111111111111', '[{"coffee_id": "test-espresso", "quantity": {}}]'::jsonb) $$,
  'Object quantity rejected'
);

select throws_ok(
  $$ select * from public.create_order('11111111-1111-1111-1111-111111111111', '[null]'::jsonb) $$,
  'Null item element rejected'
);

select throws_ok(
  $$ select * from public.create_order('11111111-1111-1111-1111-111111111111', '[{"quantity": 1}]'::jsonb) $$,
  'Missing coffee_id rejected'
);

select throws_ok(
  $$ select * from public.create_order('11111111-1111-1111-1111-111111111111', '[{"coffee_id": "", "quantity": 1}]'::jsonb) $$,
  'Empty string coffee_id rejected'
);

select throws_ok(
  $$ select * from public.create_order('11111111-1111-1111-1111-111111111111', '[{"coffee_id": 123, "quantity": 1}]'::jsonb) $$,
  'Numeric coffee_id rejected'
);

select throws_ok(
  $$ select * from public.create_order('00000000-0000-0000-0000-000000000000', '[{"coffee_id": "test-espresso", "quantity": 1}]'::jsonb) $$,
  'Non-existent slot rejected'
);

select throws_ok(
  $$ select * from public.create_order('22222222-2222-2222-2222-222222222222', '[{"coffee_id": "test-espresso", "quantity": 1}]'::jsonb) $$,
  'Full slot rejected'
);

-- VERIFY TOTALS & SNAPSHOTS
reset role;

select results_eq(
  $$ select total_quantity, total_price from public.orders where customer_name = 'Олександр' order by created_at desc limit 1 $$,
  $$ values (2, 100.00::numeric) $$,
  'Order totals calculated correctly (2 items * 50.00 = 100.00)'
);

select results_eq(
  $$ select coffee_title, unit_price, quantity from public.order_items where order_id = (select id from public.orders where customer_name = 'Олександр' order by created_at desc limit 1) $$,
  $$ values ('Test Espresso'::text, 50.00::numeric, 2) $$,
  'Order items snapshot recorded correctly'
);

select ok(
  (select order_number is not null from public.orders where customer_name = 'Олександр' order by created_at desc limit 1),
  'Order number automatically generated'
);

select * from finish();

rollback;
