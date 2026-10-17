import { NextResponse } from 'next/server';
import { supabaseServer } from '@/shared/api/supabase/server';

const rateLimitMap = new Map<string, number>();

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();
    const lastRequestTime = rateLimitMap.get(ip) || 0;

    if (now - lastRequestTime < 3000) {
      return NextResponse.json(
        {
          error: 'Занадто багато запитів. Будь ласка, зачекайте кілька секунд.',
        },
        { status: 429 },
      );
    }
    rateLimitMap.set(ip, now);

    const body = await request.json();
    const slot_id = body.slot_id || body.slotId;
    const items = body.items;

    if (!slot_id || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Неповні або некоректні дані замовлення.' },
        { status: 400 },
      );
    }

    // Передаємо дефолтні значення для RPC, якщо клієнт їх не надіслав
    const customerName = body.customer_name || body.customerName || 'Гість';
    const customerPhone =
      body.customer_phone || body.customerPhone || '+380000000000';

    const { data, error } = await supabaseServer.rpc('create_order', {
      p_pickup_slot_id: slot_id,
      p_customer_name: customerName,
      p_customer_phone: customerPhone,
      p_items: items,
    });

    if (error) {
      console.error('[API /api/orders] Database RPC error detail:', error);
      return NextResponse.json(
        { error: `Помилка бази даних: ${error.message}` },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true, order: data });
  } catch (err) {
    console.error('[API /api/orders] Server Error:', err);
    return NextResponse.json(
      { error: 'Внутрішня помилка сервера при створенні замовлення.' },
      { status: 500 },
    );
  }
}
