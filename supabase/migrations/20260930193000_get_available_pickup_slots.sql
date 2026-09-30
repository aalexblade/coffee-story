begin;

create or replace function public.get_available_pickup_slots(
  p_slot_date date
)
returns setof public.pickup_slots
language sql
security definer
set search_path = public
as $$
  select ps.*
  from public.pickup_slots as ps
  where ps.slot_date = p_slot_date
    and ps.is_available = true
    and (
      (ps.slot_date + ps.slot_time)
        at time zone 'Europe/Kyiv'
    ) > now()
    and (
      select count(*)
      from public.orders as o
      where o.pickup_slot_id = ps.id
        and o.status in (
          'pending',
          'confirmed',
          'preparing',
          'ready'
        )
    ) < ps.max_orders
  order by ps.slot_time asc;
$$;

revoke all on function public.get_available_pickup_slots(date) from public;
grant execute on function public.get_available_pickup_slots(date) to anon, authenticated;

commit;