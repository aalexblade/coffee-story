-- =========================================================
-- Coffee Story
-- Initial production database schema
-- =========================================================

begin;

-- =========================================================
-- Extensions
-- =========================================================
create extension if not exists pgcrypto;

-- =========================================================
-- ENUMS
-- =========================================================
create type public.coffee_accent as enum (
  'espresso',
  'milk',
  'soft'
);

create type public.order_status as enum (
  'pending',
  'confirmed',
  'preparing',
  'ready',
  'completed',
  'cancelled'
);

-- =========================================================
-- UPDATED_AT FUNCTION
-- =========================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- =========================================================
-- COFFEE
-- =========================================================
create table public.coffee (
  id text primary key,
  slug text not null unique,

  number text not null unique,
  tag text not null,

  title text not null,
  description text not null,
  details text not null,

  price numeric(10, 2) not null,
  accent public.coffee_accent not null,

  is_available boolean not null default true,
  sort_order integer not null default 0,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint coffee_price_positive
    check (price >= 0),

  constraint coffee_sort_order_positive
    check (sort_order >= 0),

  constraint coffee_id_format
    check (id ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),

  constraint coffee_slug_format
    check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create index coffee_available_sort_order_idx
  on public.coffee (is_available, sort_order);

create trigger coffee_set_updated_at
before update on public.coffee
for each row
execute function public.set_updated_at();

-- =========================================================
-- PICKUP SLOTS
-- =========================================================
create table public.pickup_slots (
  id uuid primary key default gen_random_uuid(),

  slot_time time not null unique,

  max_orders integer not null default 5,

  is_available boolean not null default true,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint pickup_slots_max_orders_positive
    check (max_orders > 0)
);

create index pickup_slots_available_time_idx
  on public.pickup_slots (is_available, slot_time);

create trigger pickup_slots_set_updated_at
before update on public.pickup_slots
for each row
execute function public.set_updated_at();

-- =========================================================
-- ORDERS
-- =========================================================
create table public.orders (
  id uuid primary key default gen_random_uuid(),

  order_number bigint generated always as identity unique,

  pickup_slot_id uuid not null
    references public.pickup_slots(id)
    on delete restrict,

  status public.order_status not null default 'pending',

  customer_name text,
  customer_phone text,

  total_quantity integer not null default 0,
  total_price numeric(10, 2) not null default 0,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint orders_total_quantity_non_negative
    check (total_quantity >= 0),

  constraint orders_total_price_non_negative
    check (total_price >= 0),

  constraint orders_customer_name_length
    check (
      customer_name is null
      or char_length(trim(customer_name)) between 2 and 100
    ),

  constraint orders_customer_phone_length
    check (
      customer_phone is null
      or char_length(trim(customer_phone)) between 7 and 30
    )
);

create index orders_pickup_slot_idx
  on public.orders (pickup_slot_id);

create index orders_status_idx
  on public.orders (status);

create index orders_created_at_idx
  on public.orders (created_at desc);

create index orders_pickup_status_idx
  on public.orders (pickup_slot_id, status);

create trigger orders_set_updated_at
before update on public.orders
for each row
execute function public.set_updated_at();

-- =========================================================
-- ORDER ITEMS
-- =========================================================
create table public.order_items (
  id uuid primary key default gen_random_uuid(),

  order_id uuid not null
    references public.orders(id)
    on delete cascade,

  coffee_id text not null
    references public.coffee(id)
    on delete restrict,

  coffee_title text not null,
  unit_price numeric(10, 2) not null,

  quantity integer not null,
  subtotal numeric(10, 2)
    generated always as (unit_price * quantity) stored,

  created_at timestamptz not null default now(),

  constraint order_items_quantity_positive
    check (quantity > 0),

  constraint order_items_unit_price_non_negative
    check (unit_price >= 0)
);

create index order_items_order_id_idx
  on public.order_items (order_id);

create index order_items_coffee_id_idx
  on public.order_items (coffee_id);

-- =========================================================
-- SEED COFFEE
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
);

-- =========================================================
-- SEED PICKUP SLOTS
-- =========================================================
insert into public.pickup_slots (
  slot_time,
  max_orders
) values
  ('08:30', 5),
  ('09:00', 5),
  ('09:30', 5),
  ('10:00', 5),
  ('10:30', 5);

-- =========================================================
-- RLS SECURITY
-- =========================================================
alter table public.coffee enable row level security;
alter table public.pickup_slots enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- =========================================================
-- PUBLIC READ POLICIES
-- =========================================================
create policy "Public can view available coffee"
on public.coffee for select
to anon, authenticated
using (is_available = true);

create policy "Public can view available pickup slots"
on public.pickup_slots for select
to anon, authenticated
using (is_available = true);

-- REVOKE ALL DIRECT ACCESS TO ORDERS & ORDER_ITEMS
revoke all on table public.orders from anon, authenticated;
revoke all on table public.order_items from anon, authenticated;

commit;