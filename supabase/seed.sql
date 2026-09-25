-- =========================================================
-- COFFEE SEED DATA
-- =========================================================
insert into public.coffee (
  id,
  slug,
  number,
  tag,
  title,
  description,
  details,
  price,
  accent,
  sort_order
) values
(
  'espresso',
  'espresso',
  '01',
  'INTENSE',
  'Espresso',
  'Чистий смак обсмаженого зерна, щільна текстура та насичений післясмак.',
  '30 ml · 1 shot',
  70,
  'espresso',
  1
),
(
  'flat-white',
  'flat-white',
  '02',
  'BALANCED',
  'Flat White',
  'Подвійний еспресо та шовковиста мікропіна для виразного кавового характеру.',
  '180 ml · double shot',
  110,
  'milk',
  2
),
(
  'latte',
  'latte',
  '03',
  'SILKY',
  'Latte',
  'М’який кавовий смак, тепле молоко та тонкий шар піни з лате-артом.',
  '300 ml · double shot',
  120,
  'soft',
  3
)
on conflict (id) do nothing;

-- =========================================================
-- PICKUP SLOTS SEED DATA (TODAY & TOMORROW)
-- =========================================================
insert into public.pickup_slots (
  slot_date,
  slot_time,
  max_orders
) values
  (current_date, '08:30', 5),
  (current_date, '09:00', 5),
  (current_date, '09:30', 5),
  (current_date, '10:00', 5),
  (current_date, '10:30', 5),
  (current_date + interval '1 day', '08:30', 5),
  (current_date + interval '1 day', '09:00', 5),
  (current_date + interval '1 day', '09:30', 5),
  (current_date + interval '1 day', '10:00', 5),
  (current_date + interval '1 day', '10:30', 5)
on conflict (slot_date, slot_time) do nothing;