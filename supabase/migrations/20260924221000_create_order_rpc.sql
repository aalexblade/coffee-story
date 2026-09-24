begin;

-- =========================================================
-- CREATE ORDER RPC FUNCTION (WITH VALIDATIONS & DUP CHECK)
-- =========================================================
create or replace function public.create_order(
  p_pickup_slot_id uuid,
  p_items jsonb,
  p_customer_name text default null,
  p_customer_phone text default null
)
returns table (
  order_id uuid,
  order_number bigint,
  total_quantity integer,
  total_price numeric
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order_id uuid;
  v_order_number bigint;
  v_total_quantity integer;
  v_total_price numeric(10, 2);
  v_item jsonb;
  v_coffee_id text;
  v_quantity integer;
  v_unit_price numeric(10, 2);
  v_title text;
  v_current_orders integer;
  v_max_orders integer;
  v_seen_coffee_ids text[] := '{}';
begin

  -- 1. Validate items payload structure
  if p_items is null
     or jsonb_typeof(p_items) <> 'array'
     or jsonb_array_length(p_items) = 0 then
    raise exception 'Order must contain at least one item';
  end if;

  -- 2. Lock pickup slot to prevent race conditions
  select ps.max_orders
  into v_max_orders
  from public.pickup_slots ps
  where ps.id = p_pickup_slot_id
    and ps.is_available = true
  for update;

  if not found then
    raise exception 'Pickup slot is unavailable';
  end if;

  -- 3. Check slot capacity
  select count(*)
  into v_current_orders
  from public.orders o
  where o.pickup_slot_id = p_pickup_slot_id
    and o.status in ('pending', 'confirmed', 'preparing', 'ready');

  if v_current_orders >= v_max_orders then
    raise exception 'Pickup slot is fully booked';
  end if;

  -- 4. Validate customer data
  if p_customer_name is not null
     and char_length(trim(p_customer_name)) not between 2 and 100 then
    raise exception 'Invalid customer name';
  end if;

  if p_customer_phone is not null
     and char_length(trim(p_customer_phone)) not between 7 and 30 then
    raise exception 'Invalid customer phone';
  end if;

  -- 5. Insert base order record
  insert into public.orders (
    pickup_slot_id,
    status,
    customer_name,
    customer_phone
  )
  values (
    p_pickup_slot_id,
    'pending',
    nullif(trim(p_customer_name), ''),
    nullif(trim(p_customer_phone), '')
  )
  returning id, order_number
  into v_order_id, v_order_number;

  -- 6. Insert items with duplication check & quantity thresholds
  for v_item in select value from jsonb_array_elements(p_items)
  loop
    v_coffee_id := v_item ->> 'coffee_id';
    v_quantity := (v_item ->> 'quantity')::integer;

    if v_coffee_id is null then
      raise exception 'coffee_id is required';
    end if;

    if v_quantity is null or v_quantity <= 0 then
      raise exception 'Quantity must be greater than zero';
    end if;

    if v_quantity > 20 then
      raise exception 'Maximum quantity per item is 20';
    end if;

    -- Check for duplicates in the payload array
    if v_coffee_id = any(v_seen_coffee_ids) then
      raise exception 'Duplicate coffee item found in order: %', v_coffee_id;
    end if;

    v_seen_coffee_ids := array_append(v_seen_coffee_ids, v_coffee_id);

    -- Fetch actual price and availability from catalog
    select c.title, c.price
    into v_title, v_unit_price
    from public.coffee c
    where c.id = v_coffee_id
      and c.is_available = true;

    if not found then
      raise exception 'Coffee "%" is unavailable or does not exist', v_coffee_id;
    end if;

    insert into public.order_items (
      order_id,
      coffee_id,
      coffee_title,
      unit_price,
      quantity
    )
    values (
      v_order_id,
      v_coffee_id,
      v_title,
      v_unit_price,
      v_quantity
    );
  end loop;

  -- 7. Calculate total amounts from DB snapshot records
  select
    coalesce(sum(oi.quantity), 0),
    coalesce(sum(oi.subtotal), 0)
  into
    v_total_quantity,
    v_total_price
  from public.order_items oi
  where oi.order_id = v_order_id;

  -- 8. Update order totals
  update public.orders
  set
    total_quantity = v_total_quantity,
    total_price = v_total_price
  where id = v_order_id;

  -- 9. Return confirmation output
  return query
  select
    v_order_id,
    v_order_number,
    v_total_quantity,
    v_total_price;
end;
$$;

-- Security grant settings
revoke all on function public.create_order(uuid, jsonb, text, text) from public;
grant execute on function public.create_order(uuid, jsonb, text, text) to anon, authenticated;

commit;