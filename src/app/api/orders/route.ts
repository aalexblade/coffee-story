import { NextResponse } from 'next/server';
import { supabaseServer } from '@/shared/api/supabase/server';

const rateLimitMap = new Map<string, number>();

export async function POST(request: Request) {
  try {
    // 1. Обмеження частоти запитів за IP
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();
    const lastRequestTime = rateLimitMap.get(ip) || 0;

    // Захист: не частіше ніж 1 запит на 3 секунди від одного IP
    if (now - lastRequestTime < 3000) {
      return NextResponse.json(
        {
          error: 'Занадто багато запитів. Будь ласка, зачекайте кілька секунд.',
        },
        { status: 429 },
      );
    }
    rateLimitMap.set(ip, now);

    // 2. Отримання та валідація даних
    const body = await request.json();
    const { slot_id, customer_name, customer_phone, items } = body;

    const trimmedPhone = customer_phone?.trim();

    if (
      !slot_id ||
      !customer_name ||
      !trimmedPhone ||
      trimmedPhone.length < 10 ||
      !items ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        { error: 'Неповні або некоректні дані замовлення.' },
        { status: 400 },
      );
    }

    // 3. Захищений виклик RPC у Supabase через Service Role з правильним ім'ям параметра
    const { data, error } = await supabaseServer.rpc('create_order', {
      p_pickup_slot_id: slot_id,
      p_customer_name: customer_name,
      p_customer_phone: trimmedPhone,
      p_items: items,
    });

    if (error) {
      console.error('[API /api/orders] Database RPC error:', error.message);
      return NextResponse.json(
        { error: 'Помилка при створенні замовлення в базі даних.' },
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
