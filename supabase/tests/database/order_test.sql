begin;

create extension if not exists pgtap with schema extensions;
set search_path to public, extensions;

select plan(13);

-- =========================================================
-- SETUP TEST DATA
-- =========================================================

insert into public.coffee (id, title, description, details, price, tag, number, sort_order, accent, is_available, slug)
values
  ('test-espresso', 'Test Espresso', 'Desc', 'Details', 50.00, 'tag', '01', 1, 'espresso', true, 'test-espresso'),
  ('test-decaf', 'Test Decaf', 'Desc', 'Details', 60.00, 'tag', '02', 2, 'soft', false, 'test-decaf')
on conflict (id) do update set is_available = excluded.is_available, price = excluded.price;

insert into public.pickup_slots (id, slot_date, slot_time, max_orders, is_available)
values
  ('11111111-1111-1111-1111-111111111111', current_date, '23:59:00', 2, true),
  ('22222222-2222-2222-2222-222222222222', current_date, '23:59:00', 0, true)
on conflict (id) do update set max_orders = excluded.max_orders;

-- =========================================================
-- EXECUTE TESTS AS ANON
-- =========================================================

set local role anon;

-- 1. Valid order creation
select lives_ok(
  $$ select * from public.create_order(
       '11111111-1111-1111-1111-111111111111',
       '[{"coffee_id": "test-espresso", "quantity": 2}]'::jsonb,
       'Олександр',
       '+380991234567'
     ) $$,
  'Valid order creation succeeds'
);

-- 2. Empty items payload
select throws_ok(
  $$ select * from public.create_order('11111111-1111-1111-1111-111111111111', '[]'::jsonb) $$,
  'Order must contain at least one item',
  'Empty items payload rejected'
);

-- 3. Non-existent coffee_id
select throws_ok(
  $$ select * from public.create_order('11111111-1111-1111-1111-111111111111', '[{"coffee_id": "non-existent", "quantity": 1}]'::jsonb) $$,
  'Coffee "non-existent" is unavailable',
  'Non-existent coffee rejected'
);

-- 4. Unavailable coffee_id
select throws_ok(
  $$ select * from public.create_order('11111111-1111-1111-1111-111111111111', '[{"coffee_id": "test-decaf", "quantity": 1}]'::jsonb) $$,
  'Coffee "test-decaf" is unavailable',
  'Unavailable coffee rejected'
);

-- 5. Duplicate coffee_id in payload
select throws_ok(
  $$ select * from public.create_order('11111111-1111-1111-1111-111111111111', '[{"coffee_id": "test-espresso", "quantity": 1}, {"coffee_id": "test-espresso", "quantity": 2}]'::jsonb) $$,
  'Duplicate coffee_id "test-espresso" in order items',
  'Duplicate coffee in payload rejected'
);

-- 6. Quantity 0
select throws_ok(
  $$ select * from public.create_order('11111111-1111-1111-1111-111111111111', '[{"coffee_id": "test-espresso", "quantity": 0}]'::jsonb) $$,
  'Quantity for "test-espresso" must be between 1 and 20',
  'Quantity 0 rejected'
);

-- 7. Quantity 21
select throws_ok(
  $$ select * from public.create_order('11111111-1111-1111-1111-111111111111', '[{"coffee_id": "test-espresso", "quantity": 21}]'::jsonb) $$,
  'Quantity for "test-espresso" must be between 1 and 20',
  'Quantity 21 rejected'
);

-- 8. Decimal quantity
select throws_ok(
  $$ select * from public.create_order('11111111-1111-1111-1111-111111111111', '[{"coffee_id": "test-espresso", "quantity": 1.5}]'::jsonb) $$,
  'Quantity for "test-espresso" must be between 1 and 20',
  'Decimal quantity rejected'
);

-- 9. String quantity ("abc")
select throws_ok(
  $$ select * from public.create_order('11111111-1111-1111-1111-111111111111', '[{"coffee_id": "test-espresso", "quantity": "abc"}]'::jsonb) $$,
  'Quantity for "test-espresso" must be between 1 and 20',
  'String quantity rejected'
);

-- 10. Non-existent pickup slot
select throws_ok(
  $$ select * from public.create_order('00000000-0000-0000-0000-000000000000', '[{"coffee_id": "test-espresso", "quantity": 1}]'::jsonb) $$,
  'Pickup slot is unavailable',
  'Non-existent slot rejected'
);

-- 11. Fully booked slot
select throws_ok(
  $$ select * from public.create_order('22222222-2222-2222-2222-222222222222', '[{"coffee_id": "test-espresso", "quantity": 1}]'::jsonb) $$,
  'Pickup slot is fully booked',
  'Full slot rejected'
);

-- =========================================================
-- VERIFY TOTALS & SNAPSHOTS (POST-EXECUTION)
-- =========================================================

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

select * from finish();

rollback;
