begin;

create extension if not exists pgtap with schema extensions;
set search_path to public, extensions;

select plan(12);

-- 1-4. RLS Status
select ok((select relrowsecurity from pg_class where oid = 'public.coffee'::regclass), 'RLS enabled on coffee');
select ok((select relrowsecurity from pg_class where oid = 'public.pickup_slots'::regclass), 'RLS enabled on pickup_slots');
select ok((select relrowsecurity from pg_class where oid = 'public.orders'::regclass), 'RLS enabled on orders');
select ok((select relrowsecurity from pg_class where oid = 'public.order_items'::regclass), 'RLS enabled on order_items');

-- 5-10. Table Privileges for anon
set local role anon;

select ok(has_table_privilege('anon', 'public.coffee', 'SELECT'), 'anon can SELECT coffee table directly');
select ok(not has_table_privilege('anon', 'public.pickup_slots', 'SELECT'), 'anon cannot SELECT pickup_slots directly');
select ok(not has_table_privilege('anon', 'public.orders', 'SELECT'), 'anon cannot SELECT orders directly');
select ok(not has_table_privilege('anon', 'public.orders', 'INSERT'), 'anon cannot INSERT orders directly');
select ok(not has_table_privilege('anon', 'public.order_items', 'SELECT'), 'anon cannot SELECT order_items directly');
select ok(not has_table_privilege('anon', 'public.order_items', 'INSERT'), 'anon cannot INSERT order_items directly');

-- 11-12. RPC Privileges
select ok(has_function_privilege('anon', 'public.create_order(uuid,jsonb,text,text)', 'EXECUTE'), 'anon can execute create_order RPC');
select ok(has_function_privilege('anon', 'public.get_available_pickup_slots(date)', 'EXECUTE'), 'anon can execute get_available_pickup_slots RPC');

select * from finish();

rollback;
