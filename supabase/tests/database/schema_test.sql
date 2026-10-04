begin;

create extension if not exists pgtap with schema extensions;
set search_path to public, extensions;

select plan(20);

-- 1-4. Tables existence
select has_table('coffee', 'Table coffee exists');
select has_table('pickup_slots', 'Table pickup_slots exists');
select has_table('orders', 'Table orders exists');
select has_table('order_items', 'Table order_items exists');

-- 5-8. Primary keys
select has_pk('coffee', 'coffee has primary key');
select has_pk('pickup_slots', 'pickup_slots has primary key');
select has_pk('orders', 'orders has primary key');
select has_pk('order_items', 'order_items has primary key');

-- 9-11. Foreign keys
select fk_ok('orders', 'pickup_slot_id', 'pickup_slots', 'id', 'orders.pickup_slot_id references pickup_slots.id');
select fk_ok('order_items', 'order_id', 'orders', 'id', 'order_items.order_id references orders.id');
select fk_ok('order_items', 'coffee_id', 'coffee', 'id', 'order_items.coffee_id references coffee.id');

-- 12-16. Column types
select col_type_is('coffee', 'price', 'numeric(10,2)', 'coffee.price is numeric(10,2)');
select col_type_is('orders', 'total_price', 'numeric(10,2)', 'orders.total_price is numeric(10,2)');
select col_type_is('orders', 'order_number', 'bigint', 'orders.order_number is bigint');
select col_type_is('pickup_slots', 'max_orders', 'integer', 'pickup_slots.max_orders is integer');
select col_type_is('pickup_slots', 'is_available', 'boolean', 'pickup_slots.is_available is boolean');

-- 17-20. Key columns presence
select has_column('coffee', 'slug', 'coffee has slug column');
select has_column('orders', 'status', 'orders has status column');
select has_column('order_items', 'unit_price', 'order_items has unit_price column');
select has_column('pickup_slots', 'slot_time', 'pickup_slots has slot_time column');

select * from finish();

rollback;
