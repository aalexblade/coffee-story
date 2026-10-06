-- supabase/migrations/20261006210000_return_order_items_snapshot.sql

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
  v_order_id uuid;
  v_order_number bigint;
  v_total_quantity integer := 0;
  v_total_price numeric(10,2) := 0.00;
  v_item jsonb;
  v_coffee_id uuid;
  v_quantity integer;
  v_unit_price numeric(10,2);
  v_title text;
  v_items_snapshot jsonb := '[]'::jsonb;
BEGIN
  -- 1. Валідація слота
  IF NOT EXISTS (
    SELECT 1 FROM public.pickup_slots 
    WHERE id = p_pickup_slot_id AND is_available = true
  ) THEN
    RAISE EXCEPTION 'SLOT_UNAVAILABLE';
  END IF;

  -- 2. Створення замовлення
  INSERT INTO public.orders (pickup_slot_id, customer_name, customer_phone)
  VALUES (p_pickup_slot_id, p_customer_name, p_customer_phone)
  RETURNING id, order_number INTO v_order_id, v_order_number;

  -- 3. Ітерація по позиціях, зчитування ціни з DB та створення order_items
  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
  LOOP
    v_coffee_id := (v_item->>'coffee_id')::uuid;
    v_quantity := (v_item->>'quantity')::integer;

    SELECT price, title INTO v_unit_price, v_title
    FROM public.coffee
    WHERE id = v_coffee_id AND is_available = true;

    IF NOT FOUND THEN
      RAISE EXCEPTION 'COFFEE_UNAVAILABLE';
    END IF;

    INSERT INTO public.order_items (order_id, coffee_id, quantity, unit_price)
    VALUES (v_order_id, v_coffee_id, v_quantity, v_unit_price);

    v_total_quantity := v_total_quantity + v_quantity;
    v_total_price := v_total_price + (v_unit_price * v_quantity);

    -- Формуємо snapshot
    v_items_snapshot := v_items_snapshot || jsonb_build_object(
      'coffee_id', v_coffee_id,
      'title', v_title,
      'price', v_unit_price,
      'quantity', v_quantity,
      'subtotal', v_unit_price * v_quantity
    );
  END LOOP;

  -- 4. Оновлення підсумків у таблиці orders
  UPDATE public.orders
  SET total_quantity = v_total_quantity,
      total_price = v_total_price
  WHERE id = v_order_id;

  -- 5. Повертаємо авторитарний JSON
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