create or replace function public.create_order(
  p_pickup_slot_id uuid,
  p_items jsonb,
  p_customer_name text default null,
  p_customer_phone text default null
)
returns jsonb
language plpgsql
security definer
as $$
declare
  v_slot record;
  v_order_id uuid;
  v_order_number integer;
  v_formatted_order_number text;
  v_total_price numeric(10,2) := 0;
  v_total_quantity integer := 0;
  v_item jsonb;
  v_coffee record;
  v_quantity integer;
  v_item_total numeric(10,2);
begin
  if p_items is null or jsonb_array_length(p_items) = 0 then
    raise exception 'Order must contain at least one item';
  end if;

  select *
  into v_slot
  from public.pickup_slots ps
  where ps.id = p_pickup_slot_id
    and ps.is_available = true
    and ps.slot_date >= current_date
  for update;

  if not found then
    raise exception 'Selected pickup slot is not available or is in the past';
  end if;

  insert into public.orders (
    pickup_slot_id,
    customer_name,
    customer_phone,
    status,
    total_price
  )
  values (
    p_pickup_slot_id,
    p_customer_name,
    p_customer_phone,
    'pending',
    0
  )
  returning id, order_number, formatted_order_number
  into v_order_id, v_order_number, v_formatted_order_number;

  for v_item in select * from jsonb_array_elements(p_items)
  loop
    v_quantity := (v_item->>'quantity')::integer;

    if v_quantity is null or v_quantity <= 0 then
      raise exception 'Invalid quantity in order items';
    end if;

    select id, title, price, is_available
    into v_coffee
    from public.coffees
    where id = (v_item->>'coffee_id')::uuid;

    if not found or not v_coffee.is_available then
      raise exception 'Coffee item is not available';
    end if;

    v_item_total := v_coffee.price * v_quantity;
    v_total_price := v_total_price + v_item_total;
    v_total_quantity := v_total_quantity + v_quantity;

    insert into public.order_items (
      order_id,
      coffee_id,
      coffee_title,
      unit_price,
      quantity,
      total_price
    )
    values (
      v_order_id,
      v_coffee.id,
      v_coffee.title,
      v_coffee.price,
      v_quantity,
      v_item_total
    );
  end loop;

  update public.orders
  set total_price = v_total_price
  where id = v_order_id;

  return jsonb_build_object(
    'order_id', v_order_id,
    'order_number', v_order_number,
    'formatted_order_number', v_formatted_order_number,
    'total_quantity', v_total_quantity,
    'total_price', v_total_price
  );
end;
$$;