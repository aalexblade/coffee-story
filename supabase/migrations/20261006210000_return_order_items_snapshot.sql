CREATE OR REPLACE FUNCTION public.create_order(
  p_pickup_slot_id uuid,
  p_items jsonb,
  p_customer_name text DEFAULT NULL,
  p_customer_phone text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_slot public.pickup_slots%ROWTYPE;
  v_current_orders integer;
  v_order_id uuid;
  v_order_number bigint;
  v_total_quantity integer := 0;
  v_total_price numeric(10,2) := 0.00;
  
  v_item jsonb;
  v_coffee_id text;
  v_quantity integer;
  v_unit_price numeric(10,2);
  v_title text;
  v_items_snapshot jsonb := '[]'::jsonb;
  v_seen_coffee_ids text[] := ARRAY[]::text[];
BEGIN
  ------------------------------------------------------------------------------
  -- 1. СТРОГА ВАЛІДАЦІЯ PAYLOAD
  ------------------------------------------------------------------------------
  IF p_items IS NULL OR jsonb_typeof(p_items) <> 'array' OR jsonb_array_length(p_items) = 0 THEN
    RAISE EXCEPTION 'p_items must be a non-empty array';
  END IF;

  ------------------------------------------------------------------------------
  -- 2. ВАЛІДАЦІЯ ТА БЛОКУВАННЯ СЛОТА (FOR UPDATE + Capacity + Future time check)
  ------------------------------------------------------------------------------
  SELECT * INTO v_slot
  FROM public.pickup_slots
  WHERE id = p_pickup_slot_id
    AND is_available = true
    AND (
      (slot_date + slot_time) AT TIME ZONE 'Europe/Kyiv'
    ) > now()
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Pickup slot is unavailable';
  END IF;

  SELECT count(*) INTO v_current_orders
  FROM public.orders
  WHERE pickup_slot_id = p_pickup_slot_id;

  IF v_current_orders >= v_slot.max_orders THEN
    RAISE EXCEPTION 'Pickup slot is fully booked';
  END IF;

  ------------------------------------------------------------------------------
  -- 3. СТВОРЕННЯ ЗАМОВЛЕННЯ
  ------------------------------------------------------------------------------
  INSERT INTO public.orders (pickup_slot_id, customer_name, customer_phone)
  VALUES (p_pickup_slot_id, p_customer_name, p_customer_phone)
  RETURNING id, order_number INTO v_order_id, v_order_number;

  ------------------------------------------------------------------------------
  -- 4. ВАЛІДАЦІЯ ПОЗИЦІЙ ТА ФОРМУВАННЯ СЕРВЕРНОГО SNAPSHOT
  ------------------------------------------------------------------------------
  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
  LOOP
    IF jsonb_typeof(v_item) <> 'object' THEN
      RAISE EXCEPTION 'Each item must be an object';
    END IF;

    v_coffee_id := v_item->>'coffee_id';
    
    -- Перевірка коректності coffee_id
    IF v_coffee_id IS NULL OR length(trim(v_coffee_id)) = 0 THEN
      RAISE EXCEPTION 'Invalid coffee_id';
    END IF;

    -- Захист від дублікатів coffee_id в одному замовленні
    IF v_coffee_id = ANY(v_seen_coffee_ids) THEN
      RAISE EXCEPTION 'Duplicate coffee ID in order';
    END IF;
    v_seen_coffee_ids := array_append(v_seen_coffee_ids, v_coffee_id);

    -- Перевірка кількості
    BEGIN
      v_quantity := (v_item->>'quantity')::integer;
    EXCEPTION WHEN OTHERS THEN
      RAISE EXCEPTION 'Invalid quantity';
    END BEGIN;

    IF v_quantity IS NULL OR v_quantity < 1 OR v_quantity > 20 THEN
      RAISE EXCEPTION 'Invalid quantity';
    END IF;

    -- Пошук кави (v_coffee_id як TEXT/VARCHAR, захист від типу uuid)
    SELECT price, title INTO v_unit_price, v_title
    FROM public.coffee
    WHERE id::text = v_coffee_id AND is_available = true;

    IF NOT FOUND THEN
      RAISE EXCEPTION 'Coffee "%" is unavailable', v_coffee_id;
    END IF;

    INSERT INTO public.order_items (order_id, coffee_id, quantity, unit_price)
    VALUES (v_order_id, v_coffee_id::uuid, v_quantity, v_unit_price);

    v_total_quantity := v_total_quantity + v_quantity;
    v_total_price := v_total_price + (v_unit_price * v_quantity);

    -- Формуємо авторитарний snapshot
    v_items_snapshot := v_items_snapshot || jsonb_build_object(
      'coffee_id', v_coffee_id,
      'title', v_title,
      'price', v_unit_price,
      'quantity', v_quantity,
      'subtotal', v_unit_price * v_quantity
    );
  END LOOP;

  ------------------------------------------------------------------------------
  -- 5. ПІДСУМКИ ТА ПОВЕРНЕННЯ JSONB
  ------------------------------------------------------------------------------
  UPDATE public.orders
  SET total_quantity = v_total_quantity,
      total_price = v_total_price
  WHERE id = v_order_id;

  RETURN jsonb_build_object(
    'order_id', v_order_id,
    'order_number', v_order_number,
    'formatted_order_number', 'CO-' || lpad(v_order_number::text, 6, '0'),
    'total_quantity', v_total_quantity,
    'total_price', v_total_price,
    'items', v_items_snapshot
  );
END;
$$;